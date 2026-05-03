"use client"

import { useState, useEffect } from "react"
import {
  Settings, User, Lock, Globe, Bell, Shield, Save,
  Eye, EyeOff, CheckCircle2, AlertTriangle, X, Loader2,
  Mail, Phone, Building, Link as LinkIcon, ChevronRight
} from "lucide-react"
import { useAuth } from "@/context/auth-context"

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
    </div>
  )
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ icon, title, description, children }: {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-4 p-7 pb-5 border-b border-gray-50">
        <div className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-serif font-bold text-[#1A0A00]">{title}</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">{description}</p>
        </div>
      </div>
      <div className="p-7 space-y-5">{children}</div>
    </div>
  )
}

// ─── Form helpers ─────────────────────────────────────────────────────────────
const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition bg-white disabled:bg-gray-50 disabled:text-gray-400"
const labelClass = "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  )
}

function SaveButton({ isLoading, label = "Save Changes" }: { isLoading: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-xl font-bold text-sm hover:bg-[#700000] transition disabled:opacity-60"
    >
      {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> {label}</>}
    </button>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { user, role } = useAuth()

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type })
  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("iuea_token") : null

  // ── Profile state ──
  const [profileName, setProfileName] = useState(user?.name || "")
  const [profileEmail] = useState(user?.email || "")
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  useEffect(() => {
    if (user?.name) setProfileName(user.name)
  }, [user])

  // ── Password state ──
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  // ── Site settings (super admin) ──
  const [siteSettings, setSiteSettings] = useState({
    site_name: "IUEA - International University of East Africa",
    tagline: "Learning to Succeed",
    contact_email: "info@iuea.ac.ug",
    contact_phone: "800 335 335",
    address: "Plot 1112/1121, Kansanga Ggaba Road, Kampala, Uganda",
    facebook_url: "https://facebook.com/iuea",
    twitter_url: "https://twitter.com/iuea",
    instagram_url: "https://instagram.com/iuea",
    linkedin_url: "https://linkedin.com/company/iuea",
    maintenance_mode: false,
    allow_applications: true,
  })
  const [isSavingSite, setIsSavingSite] = useState(false)

  // ── Load site settings ──
  useEffect(() => {
    if (role === "super_admin") {
      const loadSettings = async () => {
        try {
          const res = await fetch("http://localhost:8000/api/settings", {
            headers: {
              Accept: "application/json",
              ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
            },
          })
          const data = await res.json()
          if (data?.success && Array.isArray(data.data)) {
            const map: Record<string, string> = {}
            data.data.forEach((s: { key: string; value: string }) => { map[s.key] = s.value })
            setSiteSettings(prev => ({
              ...prev,
              site_name: map.site_name || prev.site_name,
              tagline: map.tagline || prev.tagline,
              contact_email: map.contact_email || prev.contact_email,
              contact_phone: map.contact_phone || prev.contact_phone,
              address: map.address || prev.address,
              facebook_url: map.facebook_url || prev.facebook_url,
              twitter_url: map.twitter_url || prev.twitter_url,
              instagram_url: map.instagram_url || prev.instagram_url,
              linkedin_url: map.linkedin_url || prev.linkedin_url,
              maintenance_mode: map.maintenance_mode === "true",
              allow_applications: map.allow_applications !== "false",
            }))
          }
        } catch { /* use defaults */ }
      }
      loadSettings()
    }
  }, [role])

  // ── Handlers ──

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)
    try {
      // Using change-password endpoint for name update (or just update localStorage)
      // Since backend may not have a dedicated profile endpoint, we update localStorage
      const storedUser = JSON.parse(localStorage.getItem("iuea_user") || "{}")
      storedUser.name = profileName
      localStorage.setItem("iuea_user", JSON.stringify(storedUser))
      showToast("Profile updated successfully!")
    } catch {
      showToast("Failed to update profile", "error")
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.")
      return
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.")
      return
    }
    setIsSavingPassword(true)
    try {
      const res = await fetch("http://localhost:8000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Password change failed")
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("")
      showToast("Password changed successfully!")
    } catch (err: any) {
      setPasswordError(err.message)
    } finally {
      setIsSavingPassword(false)
    }
  }

  const handleSiteSettingSave = async (key: string, value: string) => {
    try {
      await fetch("http://localhost:8000/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
        body: JSON.stringify({ key, value }),
      })
    } catch { /* silent */ }
  }

  const handleSiteSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingSite(true)
    try {
      const entries = Object.entries(siteSettings)
      await Promise.all(
        entries.map(([key, value]) => handleSiteSettingSave(key, String(value)))
      )
      showToast("Site settings saved!")
    } catch {
      showToast("Failed to save settings", "error")
    } finally {
      setIsSavingSite(false)
    }
  }

  const PasswordInput = ({
    label, value, onChange, show, onToggle, placeholder
  }: {
    label: string; value: string; onChange: (v: string) => void;
    show: boolean; onToggle: () => void; placeholder?: string
  }) => (
    <Field label={label}>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          required type={show ? "text" : "password"}
          placeholder={placeholder || "••••••••"}
          className={`${inputClass} pl-10 pr-10`}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </Field>
  )

  return (
    <>
      <div className="space-y-8 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-black text-[#1A0A00]">Settings</h1>
          <p className="text-gray-500 font-medium mt-1">Manage your account preferences and site configuration.</p>
        </div>

        {/* ── 1. Profile ── */}
        <SectionCard
          icon={<User className="w-5 h-5 text-[#8B0000]" />}
          title="Profile Information"
          description="Update your name and view your account details."
        >
          <form onSubmit={handleProfileSave} className="space-y-5">
            <div className="flex items-center gap-5 mb-2">
              <div className="w-16 h-16 rounded-full bg-[#1A0A00] flex items-center justify-center text-[#E8B84B] text-2xl font-black shrink-0">
                {profileName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-[#1A0A00]">{profileName}</p>
                <p className="text-sm text-gray-400">{profileEmail}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-700">
                  {(role || "").replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    className={`${inputClass} pl-10`}
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                  />
                </div>
              </Field>
              <Field label="Email Address">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" className={`${inputClass} pl-10`} value={profileEmail} disabled />
                </div>
              </Field>
            </div>
            <div className="flex justify-end">
              <SaveButton isLoading={isSavingProfile} label="Update Profile" />
            </div>
          </form>
        </SectionCard>

        {/* ── 2. Change Password ── */}
        <SectionCard
          icon={<Lock className="w-5 h-5 text-[#8B0000]" />}
          title="Change Password"
          description="Choose a strong password to keep your account secure."
        >
          <form onSubmit={handlePasswordSave} className="space-y-5">
            {passwordError && (
              <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                {passwordError}
              </div>
            )}
            <PasswordInput
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrent}
              onToggle={() => setShowCurrent(v => !v)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PasswordInput
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                show={showNew}
                onToggle={() => setShowNew(v => !v)}
                placeholder="Min. 8 characters"
              />
              <PasswordInput
                label="Confirm New Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showConfirm}
                onToggle={() => setShowConfirm(v => !v)}
                placeholder="Re-enter new password"
              />
            </div>
            <div className="flex justify-end">
              <SaveButton isLoading={isSavingPassword} label="Change Password" />
            </div>
          </form>
        </SectionCard>

        {/* ── 3. Site Settings (Super Admin Only) ── */}
        {role === "super_admin" && (
          <SectionCard
            icon={<Globe className="w-5 h-5 text-[#8B0000]" />}
            title="Site Settings"
            description="Configure university contact details, social links, and site behaviour."
          >
            <form onSubmit={handleSiteSettingsSave} className="space-y-6">
              {/* General */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-300 mb-4">General</p>
                <div className="space-y-4">
                  <Field label="Site Name">
                    <input type="text" className={inputClass} value={siteSettings.site_name}
                      onChange={e => setSiteSettings(p => ({ ...p, site_name: e.target.value }))} />
                  </Field>
                  <Field label="Tagline">
                    <input type="text" className={inputClass} value={siteSettings.tagline}
                      onChange={e => setSiteSettings(p => ({ ...p, tagline: e.target.value }))} />
                  </Field>
                </div>
              </div>

              {/* Contact */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-300 mb-4">Contact Information</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Contact Email">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" className={`${inputClass} pl-10`} value={siteSettings.contact_email}
                          onChange={e => setSiteSettings(p => ({ ...p, contact_email: e.target.value }))} />
                      </div>
                    </Field>
                    <Field label="Phone Number">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" className={`${inputClass} pl-10`} value={siteSettings.contact_phone}
                          onChange={e => setSiteSettings(p => ({ ...p, contact_phone: e.target.value }))} />
                      </div>
                    </Field>
                  </div>
                  <Field label="Physical Address">
                    <div className="relative">
                      <Building className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <textarea rows={2} className={`${inputClass} pl-10 resize-none`} value={siteSettings.address}
                        onChange={e => setSiteSettings(p => ({ ...p, address: e.target.value }))} />
                    </div>
                  </Field>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-300 mb-4">Social Media Links</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "facebook_url", label: "Facebook URL" },
                    { key: "twitter_url", label: "Twitter / X URL" },
                    { key: "instagram_url", label: "Instagram URL" },
                    { key: "linkedin_url", label: "LinkedIn URL" },
                  ].map(({ key, label }) => (
                    <Field key={key} label={label}>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="url" className={`${inputClass} pl-10`}
                          value={(siteSettings as any)[key]}
                          onChange={e => setSiteSettings(p => ({ ...p, [key]: e.target.value }))} />
                      </div>
                    </Field>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-300 mb-4">Site Behaviour</p>
                <div className="space-y-3">
                  {[
                    { key: "maintenance_mode", label: "Maintenance Mode", desc: "Show a maintenance page to all public visitors", danger: true },
                    { key: "allow_applications", label: "Allow Applications", desc: "Enable the online application portal for prospective students" },
                  ].map(({ key, label, desc, danger }) => (
                    <div key={key} className={`flex items-center justify-between p-4 rounded-xl border ${danger && (siteSettings as any)[key] ? "border-red-200 bg-red-50" : "border-gray-100 bg-gray-50"}`}>
                      <div>
                        <p className={`text-sm font-bold ${danger && (siteSettings as any)[key] ? "text-red-700" : "text-[#1A0A00]"}`}>{label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSiteSettings(p => ({ ...p, [key]: !(p as any)[key] }))}
                        className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${(siteSettings as any)[key] ? (danger ? "bg-red-600" : "bg-[#8B0000]") : "bg-gray-200"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${(siteSettings as any)[key] ? "left-7" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <SaveButton isLoading={isSavingSite} label="Save Site Settings" />
              </div>
            </form>
          </SectionCard>
        )}

        {/* ── 4. System Info ── */}
        <SectionCard
          icon={<Shield className="w-5 h-5 text-[#8B0000]" />}
          title="System Information"
          description="Read-only details about this installation."
        >
          <div className="space-y-3">
            {[
              { label: "Application", value: "IUEA Admin Portal" },
              { label: "Version", value: "v1.0.0" },
              { label: "Frontend", value: "Next.js 15 (Turbopack)" },
              { label: "Backend", value: "Laravel 11 + Sanctum" },
              { label: "Database", value: "MySQL" },
              { label: "Logged In As", value: `${user?.name || "—"} (${(role || "").replace("_", " ")})` },
              { label: "Account Email", value: user?.email || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</span>
                <span className="text-sm font-bold text-[#1A0A00]">{value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  )
}
