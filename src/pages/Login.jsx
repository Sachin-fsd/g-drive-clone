
import { useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, AlertCircle, Wifi, WifiOff } from "lucide-react"

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

const Login = ({setIsAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [retryCount, setRetryCount] = useState(0)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const navigate = useNavigate()

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.email) {
      setError("Email is required")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (!formData.password) {
      setError("Password is required")
      return false
    }
    return true
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    if (!isOnline) {
      setError("You're offline. Please check your internet connection.")
      return
    }

    setLoading(true)
    setError("")

    try {
      console.log("[v0] Attempting login to:", `${VITE_API_URL}/auth/login`)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const res = await fetch(`${VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/dashboard/home")
        setRetryCount(0)
      } else {
        if (res.status === 401) {
          setError("Invalid email or password")
        } else if (res.status === 429) {
          setError("Too many login attempts. Please try again later.")
        } else {
          setError(data.error || "Login failed. Please try again.")
        }
      }
    } catch (err) {
      console.log("[v0] Login error:", err)
      setRetryCount((prev) => prev + 1)

      if (err.name === "AbortError") {
        setError("Request timed out. Please check your connection and try again.")
      } else if (!navigator.onLine) {
        setError("You're offline. Please check your internet connection.")
      } else if (err.message.includes("fetch")) {
        setError("Unable to connect to server. Please check if the server is running.")
      } else {
        setError("Network error. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setError("")
    setRetryCount(0)
    handleLogin({ preventDefault: () => {} })
  }

  const getErrorIcon = () => {
    if (error.includes("offline") || error.includes("internet")) {
      return <WifiOff className="w-4 h-4" />
    }
    if (error.includes("server") || error.includes("connect")) {
      return <Wifi className="w-4 h-4" />
    }
    return <AlertCircle className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 mb-6 group">
            <div className="relative">
              <img 
                src="/logo.jpg" 
                alt="SkyVault Logo" 
                className="h-12 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              SkyVault
            </h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your secure file vault</p>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
            <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-red-500 mt-0.5">{getErrorIcon()}</div>
                  <div className="flex-1">
                    <p className="text-sm text-red-700">{error}</p>
                    {retryCount > 0 && <p className="text-xs text-red-600 mt-1">Attempt {retryCount}</p>}
                    {(error.includes("server") || error.includes("Network")) && (
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !isOnline}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
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
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="group-hover:text-gray-900 transition-colors">Sign in with Google</span>
            </a>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                >
                  Create one here
                </button>
              </p>
            </div>
          </form>
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

export default Login
