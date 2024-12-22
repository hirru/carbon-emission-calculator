import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { submitFormData } from "../services/api";

type FormData = {
  accountNumber: string;
  buildingType: string;
  area: number;
  electricity: number;
  electricityRate: number;
  naturalGas: number;
  naturalGasRate: number;
  steam: number;
  steamRate: number;
  fuelOil2: number;
  fuelOil2Rate: number;
  fuelOil4: number;
  fuelOil4Rate: number;
  solarPV: number;
};

const buildingTypes = [
  "Adult Education",
  "Ambulatory Surgical Center",
  "Automobile Dealership",
  "Bank Branch",
  "Bowling Alley",
  "College/University",
  "Convenience Store without Gas Station",
  "Courthouse",
  "Data Center",
  "Distribution Center",
  "Enclosed Mall",
  "Financial Office",
  "Fitness Center/Health Club/Gym",
  "Food Sales",
  "Food Service",
  "Hospital (General Medical & Surgical)",
  "Hotel",
  "K-12 School",
  "Laboratory",
  "Library",
  "Lifestyle Center",
  "Mailing Center/Post Office",
  "Manufacturing/Industrial Plant",
  "Medical Office",
  "Movie Theater",
  "Multifamily Housing",
  "Museum",
  "Non-Refrigerated Warehouse",
  "Office",
  "Other - Education",
  "Other - Entertainment/Public Assembly",
  "Other - Lodging/Residential",
  "Other - Mall",
  "Other - Public Services",
  "Other - Recreation",
  "Other - Restaurant/Bar",
  "Other - Services",
  "Other - Specialty Hospital",
  "Other - Technology/Science",
  "Outpatient Rehabilitation/Physical Therapy",
  "Parking",
];

const accountNumbers = [
  { id: "12345", label: "Account 12345" },
  { id: "67890", label: "Account 67890" },
  { id: "11223", label: "Account 11223" },
];

const CalculatorForm: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("submitting form:", data);
    try {
      const response = await submitFormData(data);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        mt: 5,
        padding: 3,
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        LL97 Calculator Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Account Number */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="account-number-label">Account Number</InputLabel>
          <Controller
            name="accountNumber"
            control={control}
            defaultValue=""
            rules={{ required: "Account Number is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="account-number-label"
                label="Account Number"
              >
                {accountNumbers.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* Building Inputs Section */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Building Inputs
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="building-type-label">Building Type</InputLabel>
          <Controller
            name="buildingType"
            control={control}
            defaultValue=""
            rules={{ required: "Building Type is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="building-type-label"
                label="Building Type"
              >
                {buildingTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Controller
            name="area"
            control={control}
            defaultValue={0}
            rules={{ required: "Area is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Area (SF)"
                type="number"
                variant="outlined"
              />
            )}
          />
        </FormControl>

        {/* Utility Inputs Section */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Utility Inputs
        </Typography>
        {[
          { name: "electricity", label: "Electricity (kWh)" },
          { name: "electricityRate", label: "$/kWh" },
          { name: "naturalGas", label: "Natural Gas (therms)" },
          { name: "naturalGasRate", label: "$/therm" },
          { name: "steam", label: "Steam (mLbs)" },
          { name: "steamRate", label: "$/mLb" },
          { name: "fuelOil2", label: "Fuel/Oil #2 (gal)" },
          { name: "fuelOil2Rate", label: "$/gal" },
          { name: "fuelOil4", label: "Fuel/Oil #4 (gal)" },
          { name: "fuelOil4Rate", label: "$/gal" },
        ].map((utility) => (
          <FormControl fullWidth sx={{ mb: 3 }} key={utility.name}>
            <Controller
              name={utility.name as keyof FormData}
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={utility.label}
                  type="number"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
        ))}

        {/* Carbon Deduction Section */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Carbon Deduction
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Controller
            name="solarPV"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                label="Solar PV (kWh)"
                type="number"
                variant="outlined"
              />
            )}
          />
        </FormControl>

        {/* Buttons */}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => reset()}
        >
          Reset
        </Button>
      </form>
    </Box>
  );
};

export default CalculatorForm;
