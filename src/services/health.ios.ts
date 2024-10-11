
import AppleHealthKit from 'react-native-health';
const healthKitOptions = {
    permissions: {
        // write: [],
        read: [
            AppleHealthKit.Constants.Permissions.Height,
            AppleHealthKit.Constants.Permissions.Weight,
            AppleHealthKit.Constants.Permissions.StepCount,
            AppleHealthKit.Constants.Permissions.Workout,
            AppleHealthKit.Constants.Permissions.SleepAnalysis,
            AppleHealthKit.Constants.Permissions.DateOfBirth,
            AppleHealthKit.Constants.Permissions.Water,
            AppleHealthKit.Constants.Permissions.Steps,
        ],

        // read: [AppleHealthKit.Constants.Permissions.StepCount, AppleHealthKit.Constants.Permissions.Height, AppleHealthKit.Constants.Permissions.Water, AppleHealthKit.Constants.Permissions.DateOfBirth],
    },
};


const healthServiceUseCase = (setHealthData: any, setOnPermission: any) => {
    const initHealthService = () => {
        AppleHealthKit.initHealthKit(healthKitOptions, (err, result) => {
            if (result) {
                setOnPermission(result)
            }
            if (err) {
                throw err;
            }
        }); 
    }

    const fetchHealthData = () => {
        const fetchData = async () => {
            try {
                const height = await getHeight();
                const weight = await getWeight();
                const workouts = await getWorkouts();
                const sleepData = await getSleepData();
                const age = await getAge();
                const dailySteps = await getDailySteps();
                const waterIntake = await getWaterIntake();


                setHealthData({
                    height,
                    weight,
                    workouts,
                    sleepData,
                    age,
                    dailySteps,
                    waterIntake,
                });
            } catch (error) {
                console.log('Error fetching health data: ', error);
            }
        };

        fetchData();
    };



    return { initHealthService, fetchHealthData }

}


const getAge = () => {
    return new Promise((resolve, reject) => {
        AppleHealthKit.getDateOfBirth({}, (err, dob) => {
            console.log(dob)
            // if (err) return reject(err);
            resolve(dob);
        });
    });
};

const getHeight = () => {
    return new Promise((resolve, reject) => {
        AppleHealthKit.getLatestHeight({}, (err, height) => {
            // if (err) return reject(err);
            resolve(height);
        });
    });
};

const getWeight = () => {
    return new Promise((resolve, reject) => {
        AppleHealthKit.getLatestWeight({}, (err, weight) => {
            // if (err) return reject(err);
            resolve(weight);
        });
    });
};

const getDailySteps = () => {
    // const options = {
    //     startDate: new Date().toISOString(),
    //     endDate: new Date().toISOString(),
    // };

    return new Promise((resolve, reject) => {
        AppleHealthKit.getStepCount({}, (err, results) => {
            // if (err) return reject(err);
            resolve(results?.value);
        });
    });
};

const getWorkouts = () => {
    const options = {
        startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
        endDate: new Date().toISOString(),                                              // Now                              // Fetch workout data
    };


    return new Promise((resolve, reject) => {
        AppleHealthKit.getAnchoredWorkouts(options, (err, workouts) => {
            // if (err) return reject(err);
            resolve(workouts?.data);
        });
    });
};

const getWaterIntake = () => {
    const options = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
        AppleHealthKit.getWater({
        }, (err, results) => {
            // if (err) return reject(err);
            resolve(results);
        });
    });
};

const getSleepData = () => {
    const options = {
        startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
        endDate: new Date().toISOString(),                                              // Now
    };

    return new Promise((resolve, reject) => {
        AppleHealthKit.getSleepSamples(options, (err, sleepData) => {
            // if (err) return reject(err);
            resolve(sleepData);
        });
    });
};




export { healthServiceUseCase }