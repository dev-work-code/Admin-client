import { StateCreator } from "zustand";
import api from "../utils/api";
import { handleApiError } from "../utils/errorHandler";
import {
  setAuthCookies,
  clearAuthCookies,
  getAuthCookies,
} from "../utils/cookies";

// Define the shape of the authentication state
export interface LoginAuthState {
  hospitalPhoneNumber: string; // Store the full phone number (including country code)
  user: { token: string } | null;
  orderId: string | null;
  error: string | null;
  loading: boolean;
  updateHospitalPhoneNumber: (phoneNumber: string) => void; // Update hospitalPhoneNumber directly
  requestOtp: () => Promise<void>;
  resendOtpLogin: () => Promise<void>;
  validateOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
}

// Create the authentication slice
export const createLoginAuthSlice: StateCreator<LoginAuthState> = (
  set,
  get
) => ({
  hospitalPhoneNumber: "", // Only store the full phone number with country code
  user: getAuthCookies() || null,
  orderId: null,
  error: null,
  loading: false,

  // Update the hospital phone number (including country code)
  updateHospitalPhoneNumber: (phoneNumber: string) =>
    set({ hospitalPhoneNumber: phoneNumber }),

  // Request OTP and store orderId from the response
  requestOtp: async () => {
    set({ loading: true, error: null });
    try {
      const { hospitalPhoneNumber } = get(); // Get the full phone number with country code
      const response = await api.post<{
        message: string;
        data: { orderId: string };
      }>("/hospital/login", {
        hospitalPhoneNumber, // Send the full phone number in the request
      });
      const { orderId } = response.data.data; // Extract orderId from response
      set({ orderId }); // Save orderId in the state
    } catch (error: any) {
      set({ error: handleApiError(error) });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Resend OTP request
  resendOtpLogin: async () => {
    set({ loading: true, error: null });
    try {
      const { hospitalPhoneNumber } = get(); // Get the full phone number with country code
      await api.post("/auth/resendOTP", { phoneNumber: hospitalPhoneNumber });
    } catch (error: any) {
      set({ error: handleApiError(error) });
    } finally {
      set({ loading: false });
    }
  },

  // Validate OTP with the orderId
  validateOtp: async (otp: string) => {
    set({ loading: true, error: null });
    try {
      const { hospitalPhoneNumber, orderId } = get();

      if (!orderId) {
        throw new Error("Order ID is missing. Please request OTP again.");
      }

      const response = await api.post("/hospital/verifyOtp", {
        otp,
        hospitalPhoneNumber, // Send the full phone number with country code
        orderId, // Include orderId in the request
      });

      const { token } = response.data.data;
      console.log(token);

      setAuthCookies({
        token,
      });

      return true;
    } catch (error: any) {
      set({ error: handleApiError(error) });
      clearAuthCookies();
      set({ user: null, orderId: null }); // Clear orderId on failure
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // Sign out
  logout: () => {
    clearAuthCookies();
    set({ user: null, orderId: null }); // Clear orderId on sign out
  },
});
