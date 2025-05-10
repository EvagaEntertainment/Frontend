import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";
import { toast } from "react-toastify";
import axios from "axios";
const BookingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const bookingCtaApi = useServices(commonApis.bookingCta);
  // const onSubmit = async (data) => {
  //   try {
  //     setLoading(true);

  //     const formdata = new FormData();

  //     // Append all form fields
  //     formdata.append('name', data.name);
  //     formdata.append('phone', data.phone);
  //     formdata.append('email', data.email);
  //     formdata.append('eventType', data.eventType);
  //     formdata.append('preferredDate', new Date(data.preferredDate).toISOString());

  //     // If you have file uploads, append them like this:
  //     // formdata.append('file', data.file[0]);

  //     const response = await bookingCtaApi.callApi(formdata);

  //     if (response.success) {
  //       navigate("/thank-you");
  //     } else {
  //       throw new Error(response.message || 'Submission failed');
  //     }
  //   } catch (error) {
  //     console.error("Submission error:", error);
  //     // Optionally show error to user
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 1. First prepare FormData for your original API call (unchanged)
      const formdata = new FormData();
      formdata.append("name", data.name);
      formdata.append("phone", data.phone);
      formdata.append("email", data.email);
      formdata.append("eventType", data.eventType);
      formdata.append(
        "preferredDate",
        new Date(data.preferredDate).toISOString()
      );

      // 2. Get UTM parameters from current URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get("utm_source"),
        utm_medium: urlParams.get("utm_medium"),
        utm_campaign: urlParams.get("utm_campaign"),
        utm_term: urlParams.get("utm_term"),
        utm_content: urlParams.get("utm_content"),
      };

      // 3. Call your original booking API (unchanged)
      const response = await bookingCtaApi.callApi(formdata);

      // 4. Prepare payload for Make webhook (using Axios)
      const webhookPayload = {
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phone,
        interestedEvent: data.eventType,
        interestedDate: new Date(data.preferredDate).toISOString(),
        submittedAt: new Date().toISOString(),
        device: navigator.userAgent,
        // ...utmParams,
      };

      // 5. Send to Make webhook using Axios
     const response1= await axios.post(
        "https://hook.us2.make.com/boqfxicjksa1otbong8fni9qfq4fxagh",
        webhookPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
console.log(response1);

      if (response.success) {
        navigate("/thank-you");
      } else {
        throw new Error(response.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-[#FFE500]"
      >
        <div className="text-center mb-10">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold mb-2"
            style={{ color: "#CBAB00" }}
          >
            Book Your Event
          </motion.h1>
          <motion.p variants={itemVariants} className="text-[#6B5B00]">
            Let's create something memorable together
          </motion.p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <motion.div variants={itemVariants}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{
                sx: {
                  borderRadius: "16px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFD700",
                  },
                },
              }}
            />
          </motion.div>

          {/* Contact Info Group */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Phone Number */}
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value:
                    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: "Invalid phone number",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={{
                sx: {
                  borderRadius: "16px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFD700",
                  },
                },
              }}
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                sx: {
                  borderRadius: "16px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFD700",
                  },
                },
              }}
            />
          </motion.div>

          {/* Event Type */}
          <motion.div variants={itemVariants}>
            <FormControl fullWidth>
              <InputLabel id="event-type-label" sx={{ color: "#CBAB00" }}>
                Event Type
              </InputLabel>
              <Select
                labelId="event-type-label"
                label="Event Type"
                variant="outlined"
                {...register("eventType", {
                  required: "Event type is required",
                })}
                error={!!errors.eventType}
                IconComponent={ExpandMore}
                sx={{
                  borderRadius: "16px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFD700",
                  },
                }}
              >
                <MenuItem value="Weddings">Weddings</MenuItem>
                <MenuItem value="Corporate">Corporate</MenuItem>
                <MenuItem value="Baby Showers">Baby Showers</MenuItem>
                <MenuItem value="Birthdays">Birthdays</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </motion.div>

          {/* Date Picker */}
          <motion.div variants={itemVariants}>
            <TextField
              fullWidth
              label="Preferred Date"
              type="date"
              variant="outlined"
              {...register("preferredDate", { required: "Date is required" })}
              error={!!errors.preferredDate}
              helperText={errors.preferredDate?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* <CalendarToday sx={{ color: '#CBAB00' }} /> */}
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "16px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFD700",
                  },
                },
              }}
              InputLabelProps={{
                shrink: true,
                sx: { color: "#CBAB00" },
              }}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 2,
                borderRadius: "16px",
                background: loading
                  ? "linear-gradient(45deg, #CBAB00 30%, #9C8700 90%)"
                  : "linear-gradient(45deg, #FFD700 30%, #CBAB00 90%)",
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "none",
                color: "#fff",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                "&:hover": !loading
                  ? {
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                      background:
                        "linear-gradient(45deg, #F9D703 30%, #FFD700 90%)",
                    }
                  : {},
                "&.Mui-disabled": {
                  background:
                    "linear-gradient(45deg, #CBAB00 30%, #9C8700 90%)",
                  color: "#ffffff90",
                },
              }}
            >
              {loading ? "Submitting..." : "Schedule Your Event"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BookingForm;
