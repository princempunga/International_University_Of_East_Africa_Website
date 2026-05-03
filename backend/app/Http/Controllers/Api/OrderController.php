<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $query = Order::with('items');

        if ($request->has('order_status')) {
            $query->where('order_status', $request->order_status);
        }

        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        $orders = $query->latest()->paginate(15);

        return $this->sendResponse($orders->items(), 'Orders retrieved successfully.', [
            'total' => $orders->total(),
            'per_page' => $orders->perPage(),
            'current_page' => $orders->currentPage(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required',
            'customer_email' => 'required|email',
            'customer_phone' => 'required',
            'delivery_address' => 'required',
            'delivery_city' => 'required',
            'delivery_method' => 'required|in:campus_pickup,kampala,upcountry',
            'payment_method' => 'required|in:mtn_momo,airtel,card,bank',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        try {
            DB::beginTransaction();

            $orderNumber = 'IUEA-' . date('Y') . '-' . str_pad(Order::count() + 1, 4, '0', STR_PAD_LEFT);
            
            $subtotal = 0;
            $orderItems = [];

            foreach ($request->items as $itemData) {
                $product = Product::findOrFail($itemData['product_id']);
                
                if ($product->stock_quantity < $itemData['quantity']) {
                    throw new \Exception("Insufficient stock for product: " . $product->name);
                }

                $price = $product->sale_price ?? $product->price;
                $itemSubtotal = $price * $itemData['quantity'];
                $subtotal += $itemSubtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_price' => $price,
                    'quantity' => $itemData['quantity'],
                    'size' => $itemData['size'] ?? null,
                    'color' => $itemData['color'] ?? null,
                    'subtotal' => $itemSubtotal,
                ];

                // Update stock
                $product->decrement('stock_quantity', $itemData['quantity']);
            }

            $deliveryFee = $this->calculateDeliveryFee($request->delivery_method);
            $tax = $subtotal * 0.18; // 18% VAT example
            $total = $subtotal + $deliveryFee + $tax;

            $order = Order::create([
                'order_number' => $orderNumber,
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'delivery_address' => $request->delivery_address,
                'delivery_city' => $request->delivery_city,
                'delivery_method' => $request->delivery_method,
                'delivery_fee' => $deliveryFee,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total,
                'payment_method' => $request->payment_method,
                'payment_status' => 'pending',
                'order_status' => 'pending',
                'notes' => $request->notes,
            ]);

            foreach ($orderItems as $item) {
                $item['order_id'] = $order->id;
                OrderItem::create($item);
            }

            DB::commit();

            return $this->sendResponse($order->load('items'), 'Order placed successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Order Placement Failed.', ['error' => $e->getMessage()], 400);
        }
    }

    private function calculateDeliveryFee($method)
    {
        return match ($method) {
            'campus_pickup' => 0,
            'kampala' => 5000,
            'upcountry' => 15000,
            default => 0,
        };
    }

    public function show($identifier): JsonResponse
    {
        $order = Order::with('items')
            ->where('id', $identifier)
            ->orWhere('order_number', $identifier)
            ->firstOrFail();
            
        return $this->sendResponse($order, 'Order retrieved successfully.');
    }

    public function updateStatus(Request $request, $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'order_status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $order = Order::findOrFail($id);
        $order->update(['order_status' => $request->order_status]);

        return $this->sendResponse($order, 'Order status updated successfully.');
    }

    public function updatePaymentStatus(Request $request, $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'payment_status' => 'required|in:pending,paid,failed',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $order = Order::findOrFail($id);
        $order->update(['payment_status' => $request->payment_status]);

        return $this->sendResponse($order, 'Payment status updated successfully.');
    }

    public function track($orderNumber): JsonResponse
    {
        $order = Order::where('order_number', $orderNumber)->first();
        if (!$order) {
            return $this->sendError('Order not found.');
        }

        return $this->sendResponse([
            'order_number' => $order->order_number,
            'order_status' => $order->order_status,
            'payment_status' => $order->payment_status,
            'updated_at' => $order->updated_at,
        ], 'Order tracking data retrieved.');
    }
}
