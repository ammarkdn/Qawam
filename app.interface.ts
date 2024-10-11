// Interface for Age data
interface AgeData {
    age: number;
    value: string; // ISO date string for birthdate
}


// Interface for height, weight, or other measurement data
interface MeasurementData {
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    value: number;     // Numerical value (e.g., height in cm, weight in kg)
}

interface WaterIntake {
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    value: number;     // Numerical value (e.g., height in cm, weight in kg)
}

// Interface for the overall health data structure
interface HealthDataResponse {
    age: AgeData;
    dailySteps: number;    // Number of daily steps
    height: MeasurementData;
    sleepData: any[];      // Array for sleep data (could be further defined if needed)
    waterIntake: WaterIntake;    // Array for water intake data (could be further defined if needed)
    weight: MeasurementData;
    workouts: any[];       // Array for workout data (could be further defined if needed)
}

