import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingScreen from './screens/SettingsScreen';
import { TaskProvider } from './contexts/TaskContext';

const Stack = createStackNavigator();
const Tab= createBottomTabNavigator
const Drawer=createDrawerNavigator

function HomeStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown:false}}  
      />
      <Stack.Screen
        name='AddTask'
        component={AddTaskScreen}
        options={{
          title:'Adicionar Tarefas',
          headerStyle:{backgroundColor:'#28a745'},
          headerTintColor:'#fff',
        }}
      />
      <Stack.Screen
        name='Details'
        component={DetailsScreen}
        options={{
          title:'Detalhes da Tarefas',
          headerStyle:{backgroundColor: '#dc3545'},
          headerTintColor:'#fff'
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator(){
  return(
    <Tab.Navigator 
    screenOptions={({route})=>({ 
      tabBarIcon:({color, size})=>{
        let iconName;
        if(route.name==='Tarefas')iconName='home';
        else if(route.name==='Perfil')iconName='person';
        else if(route.name==='Configurações')iconName='setting';
        return <Icon name={iconName} size={size} color={color}/>;
      },
      tabBarActiveTintColor:'#007bff',
      tabBarInativeTinColor:'#666',
      tabBarStyle:{backgroundColor:'#f5f5f5'},
    })}>
      <Tab.Screen name="Tarefas" component={HomeScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Perfil" component={ProfileScreen}/>
      <Tab.Screen name="Configurações" component={SettingScreen}/>
    </Tab.Navigator>
  )
}

function DrawerNavigator(){
  return(
    <Drawer.Navigator
       screenOptions={{
        drawerStyle:{backgroundColor:'#f5f5f5', width:240},
        drawerActiveTintColor:'#007bff',
        drawerInativeTinColor:'#666',
       }}
    >
      <Drawer.Screen
        name="Tarefas"
        component={TabNavigator}
        options={{
          drawerIcon:({color,size})=>(
            <Icon name="home" size={size} color={color}/>
          )
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          drawerIcon:({color,size})=>(
            <Icon name="person" size={size} color={color}/>
          )
        }}
      />
      <Drawer.Screen
        name="Configurações"
        component={SettingScreen}
        options={{
          drawerIcon:({color,size})=>(
            <Icon name="settings" size={size} color={color}/>
          )
        }}
      />

    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{
              title: 'Adicionar Tarefa',
              headerStyle: { backgroundColor: '#28a745' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: 'Detalhes da Tarefa',
              headerStyle: { backgroundColor: '#dc3545' },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}