

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, User, Mail, Lock, Cloud, Shield, Zap, RefreshCw, Wifi, WifiOff } from "lucide-react"

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    if (!name.trim()) newErrors.name = "Full name is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid"
    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getNetworkErrorMessage = (error) => {
    if (!navigator.onLine) {
      return {
        message: "No internet connection. Please check your network and try again.",
        type: "offline",
        icon: <WifiOff className="w-4 h-4" />,
      }
    }

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return {
        message: "Unable to connect to server. Please check if the server is running.",
        type: "connection",
        icon: <Wifi className="w-4 h-4" />,
      }
    }

    if (error.name === "AbortError") {
      return {
        message: "Request timed out. The server might be slow or unavailable.",
        type: "timeout",
        icon: <RefreshCw className="w-4 h-4" />,
      }
    }

    return {
      message: "Network error occurred. Please try again.",
      type: "general",
      icon: <RefreshCw className="w-4 h-4" />,
    }
  }

  const handleRegister = async (e, isRetry = false) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setErrors({})
    if (isRetry) {
      setIsRetrying(true)
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const res = await fetch(`${VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      const data = await res.json()

      if (res.ok) {
        setRetryCount(0)
        alert("Registration successful. Please log in.")
        navigate("/login")
      } else {
        const errorMessage = data.error || `Registration failed (${res.status})`
        setErrors({ submit: errorMessage, type: "server" })
      }
    } catch (err) {
      clearTimeout(timeoutId)
      const errorInfo = getNetworkErrorMessage(err)
      setErrors({
        submit: errorInfo.message,
        type: errorInfo.type,
        icon: errorInfo.icon,
        canRetry: true,
      })

      if (isRetry) {
        setRetryCount((prev) => prev + 1)
      }
    } finally {
      setLoading(false)
      setIsRetrying(false)
    }
  }

  const handleRetry = (e) => {
    e.preventDefault()
    handleRegister(e, true)
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      {/* Left Panel - Enhanced */}
      <div className="hidden lg:flex w-1/2 relative z-10 flex-col justify-center items-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-sm rounded-3xl"></div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="inline-flex items-center gap-4 mb-8 group">
            <div className="relative">
              <img 
                src="/logo.jpg" 
                alt="SkyVault Logo" 
                className="h-12 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-200 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 bg-clip-text text-transparent">
              SkyVault
            </h1>
          </div>

          <div className="space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 leading-tight">
              Join the Future of
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                File Management
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience secure, lightning-fast cloud storage with enterprise-grade security.
            </p>
          </div>

          {/* Enhanced Feature highlights */}
          <div className="space-y-6">
            <div className="group flex items-center p-4 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40 hover:bg-white/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 mb-1">Military-Grade Security</h3>
                <p className="text-gray-600 text-sm">256-bit AES encryption for all your files</p>
              </div>
            </div>
            
            <div className="group flex items-center p-4 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40 hover:bg-white/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 mb-1">Lightning Performance</h3>
                <p className="text-gray-600 text-sm">Global CDN for instant access anywhere</p>
              </div>
            </div>
            
            <div className="group flex items-center p-4 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40 hover:bg-white/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 mb-1">Smart Sync</h3>
                <p className="text-gray-600 text-sm">Real-time collaboration & version control</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Enhanced Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4 group">
              <img 
                src="/logo.jpg" 
                alt="SkyVault Logo" 
                className="h-10 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300" 
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                SkyVault
              </h1>
            </div>
          </div>
          
          {/* Enhanced Form Container */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600">Start your journey with secure file management</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">

            {errors.submit && (
              <div
                className={`mb-6 p-4 border rounded-lg text-sm ${
                  errors.type === "offline"
                    ? "bg-orange-50 border-orange-200 text-orange-700"
                    : errors.type === "timeout"
                      ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                      : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-start gap-2">
                  {errors.icon}
                  <div className="flex-1">
                    <p>{errors.submit}</p>
                    {errors.canRetry && (
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleRetry}
                          disabled={isRetrying}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-white border border-current hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <RefreshCw className={`w-3 h-3 ${isRetrying ? "animate-spin" : ""}`} />
                          {isRetrying ? "Retrying..." : "Try Again"}
                        </button>
                        {retryCount > 0 && <span className="text-xs opacity-75">Attempt {retryCount + 1}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {/* Name Input */}
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.name
                        ? "border-red-300 focus:ring-red-500 bg-red-50"
                        : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    }`}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) setErrors((prev) => ({ ...prev, name: null }))
                    }}
                    required
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500 bg-red-50"
                        : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    }`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors((prev) => ({ ...prev, email: null }))
                    }}
                    required
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500 bg-red-50"
                        : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors((prev) => ({ ...prev, password: null }))
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={loading || isRetrying}
            >
              {loading || isRetrying ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {isRetrying ? "Retrying..." : "Creating Account..."}
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google OAuth Button */}
            <a
              href={`${VITE_API_URL}/auth/google`}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-300 rounded-xl font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="group-hover:text-gray-900 transition-colors">Continue with Google</span>
            </a>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors hover:underline focus:outline-none"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </p>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}

export default Register
