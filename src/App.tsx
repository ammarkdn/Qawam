import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { healthServiceUseCase } from './services/health';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const App = () => {
  const [healthData, setHealthData] = useState<undefined | HealthDataResponse>(undefined)
  const [onPermission, setOnPermission] = useState<undefined | number>(undefined)

  const { initHealthService, fetchHealthData } = healthServiceUseCase(setHealthData, setOnPermission)


  const handleInitHealthService = async () => {
    try {
      const result = await initHealthService()
    } catch (error) {

    }
  }


  useEffect(() => {
    if (onPermission === 1) {
      fetchHealthData()
    } else {
      handleInitHealthService();
    }

  }, [onPermission])
  const screenWidth = Dimensions.get('window').width;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
   if(onPermission===1) {
    fetchHealthData()
  } 
    
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView        
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <Text className="text-3xl font-bold text-indigo-500 text-center mt-6 mb-4">
          Health Overview 🍎
        </Text>

        {/* Height and Weight Section */}

        <View className='flex flex-row items-between  gap-2  items-center mb-4'>
          {healthData?.height.value ? <View className="bg-white rounded-xl p-4 shadow-lg flex-1">
            <View className="flex-row items-center">
              <Text className="text-[14px] font-semibold text-[#000] ">🧍↕ {`Height:`}</Text>
              <Text className="text-[14px] ml-1 text-[#000] ">{`${healthData?.height?.value?.toFixed()} CM`}</Text>
            </View>
          </View> : false}



          {healthData?.weight?.value ? <View className="bg-white rounded-xl p-4 shadow-lg flex-1">
            <View className="flex-row items-center">
              <Text className="text-[14px] font-semibold text-[#000]">⚖️ {`Weight:`}</Text>
              <Text className="text-[14px] ml-1 text-[#000] ">{`${healthData?.weight?.value?.toFixed()} KM`}</Text>
            </View>
          </View> : false}
        </View>

        {/* Workout and Step Count Section */}


        <View className='flex flex-row items-between   items-center mb-4 gap-2'>
          {healthData?.workouts!?.length>0 ? <View className="bg-white rounded-xl p-4 shadow-lg flex-1">
            <View className="flex-row items-center">
              <Text className="text-[14px] font-semibold  text-[#000]">🔥 Workout:</Text>
              <Text className="text-[14px] ml-1  text-[#000] ">{healthData?.workouts[0]}</Text>
            </View>
          </View> : false}

          {/* <View className='flex-[0.1]'></View> */}

          {healthData?.age?.age ? <View className="bg-white rounded-xl p-4 shadow-lg flex-1">
            <View className="flex-row items-center ">
              <Text className="text-[14px] font-semibold ">⏳ {`Age:`}</Text>
              <Text className="text-[14px] ml-1 ">{`${healthData?.age?.age} years old`}</Text>
            </View>
          </View> : false}
        </View>




        {/* Date of Birth Date section */}
        {!isNaN(healthData?.dailySteps!) ? <View className="bg-white rounded-xl p-4 mb-4 shadow-lg">
          <View className="flex-row items-center flex-row">
            <Text className="text-[14px] font-semibold text-[#000]">👣 {`Daily Steps:`}</Text>
            <Text className="text-[14px] ml-1 text-[#000]">{`${healthData?.dailySteps} steps`}</Text>
          </View>
        </View> : false}


        {/* Body Water Section */}
        {healthData?.waterIntake?.value! >= 0 ? <View className="bg-white rounded-xl p-4 mb-4 shadow-lg">
          <View className="flex-row items-center">
            <Text className="text-[14px] font-semibold text-[#000] ">💧{`Water Intake: ${healthData?.waterIntake?.value}`}</Text>
          </View>
        </View> : false}

        {/* Sleep Analysis */}
        <View className="bg-white rounded-xl p-4  mb-4 shadow-lg">
          <Text className="text-[14px] font-semibold mb-4 text-[#000]">💤 Sleep Analysis</Text>
          <View className='flex items-center'>
           {healthData?.sleepData!.length>0? <LineChart
              data={{
                labels: ['12 AM', '2 AM', '4 AM', '6 AM', '8 AM'],
                datasets: [
                  {
                    data:healthData?.sleepData??[],
                  },
                ],
              }}
              width={screenWidth - 48} // Adjust width based on padding
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#6200ee',
                backgroundGradientTo: '#9c27b0',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />:<Text className=''>No Data Available</Text>}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
