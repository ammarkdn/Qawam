
import AppleHealthKit from 'react-native-health';
import {
    initialize,
    requestPermission,
    readRecord,
    getGrantedPermissions,
    getSdkStatus,
    revokeAllPermissions,
    readRecords,
  } from 'react-native-health-connect';
import GoogleFit, {Scopes} from 'react-native-google-fit';


const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      Scopes.FITNESS_NUTRITION_WRITE,
      Scopes.FITNESS_SLEEP_READ,
    ],
  };


export const init = async () => {
    return await initialize();
  };

  export const isAvailable = async () => {
    const res = await getSdkStatus();
    if (res === 1) {
      return { status: false, message: "SDK unavailable" };
    } else if (res === 2) {
      return { status: false, message: "SDK update required" };
    } else if (res === 3) {
      return { status: true, message: "Health Connect available" };
    }
  };

  export const getPermission = async () =>
    new Promise((resolve, reject) => {
      requestPermission([
        { accessType: 'read', recordType: 'Height' },
        { accessType: 'read', recordType: 'Weight' },
        { accessType: 'read', recordType: 'SleepSession' },
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'BodyWaterMass' },
        { accessType: 'read', recordType: 'HeartRate' },
        { accessType: 'read', recordType: 'Distance' },
        { accessType: 'read', recordType: 'TotalCaloriesBurned' },
      ])
        .then(permissions => {
          console.log('Requested permissions:', permissions);
          resolve(permissions);
        })
        .catch(e => {
            console.log({e})
          reject(Error(e.message));
        });
    });



const healthServiceUseCase = (setHealthData: any, setOnPermission: any) => {
    const initHealthService = async() => {
        try {
            await init()
            const isGG = await isAvailable();
            
            if(isGG) {
                await getPermission().then(()=>setOnPermission(1))
                
            }
        } catch (error) {
            console.log({error})
            
        }
  
    }

    const fetchHealthData = async() => {

        const fetchData = async () => {
            try {

                const weight =await getWeight();
                const height = await getHeight();
                const waterIntake = await getWaterIntake();
                const workouts = await getWorkouts();
                const sleepData = await getSleepData();
                const dailySteps = await getDailySteps();
                // const age = await getAge();

                setHealthData({
                    height,
                    weight,
                    waterIntake,
                    sleepData,
                    workouts,
                    dailySteps,
                    // age,
                });
            } catch (error) {
                console.log('Error fetching health data: ', error);
            }
        };

       await fetchData();
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

const getWeight = async() => {

    const result = await readRecords('Weight',{ 
        timeRangeFilter: {
            operator: 'after',
            startTime: '2023-01-04T12:00:00.405Z',
        },


    })
    return {value:result?.records[0]?.weight.inKilograms}
};

const getHeight =async () => {
    const result = await readRecords('Height',{ 
        timeRangeFilter: {
            operator: 'after',
            startTime: '2023-01-04T12:00:00.405Z',
        },


    })
    return {value:result?.records[0]?.height.inMeters}
};

const getDailySteps =async () => {

        const result = await readRecords('Steps',{ 
            timeRangeFilter: {
                operator: 'after',
                startTime: '2023-01-04T12:00:00.405Z',
            },
    
    
        })

        return result?.records[0]?.count??0
};

const getWorkouts =async () => {
    const result = await readRecords('TotalCaloriesBurned',{ 
        timeRangeFilter: {
            operator: 'after',
            startTime: '2023-01-04T12:00:00.405Z',
        },


    })
    return {value:result?.records[0]?.energy.inCalories??0}
};

const getWaterIntake =async () => {
    const result = await readRecords('BodyWaterMass',{ 
        timeRangeFilter: {
            operator: 'after',
            startTime: '2023-01-04T12:00:00.405Z',
        },


    })
    return {value:result?.records[0]?.mass??0}
};

const getSleepData =async () => {
    const result = await readRecords('SleepSession',{ 
        timeRangeFilter: {
            operator: 'after',
            startTime: '2023-01-04T12:00:00.405Z',
        },
    })
    return {value:result.records}
};




export { healthServiceUseCase }