import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { DatePlanOverlay } from '../components/DatePlanOverlay';
import { colors } from '../constants/theme';
import { DatePlanProvider } from '../context/DatePlanContext';

const tabs = [
  { name: 'index', title: 'For you', icon: '♧' },
  { name: 'letter', title: 'Letter', icon: '✉' },
  { name: 'memories', title: 'Memories', icon: '▧' },
  { name: 'reasons', title: 'Reasons', icon: '♡' },
] as const;

export default function RootLayout() {
  return (
    <DatePlanProvider>
    <View style={styles.root}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blueDark,
        tabBarInactiveTintColor: '#8297A4',
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tab,
        tabBarLabelStyle: styles.label,
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <Text style={[styles.icon, { color }]}>{icon}</Text>
            ),
          }}
        />
      ))}
    </Tabs>
    <DatePlanOverlay />
    </View>
    </DatePlanProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabBar: {
    height: 72,
    paddingTop: 7,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8FBFD',
    borderTopColor: '#E3EDF3',
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 0,
  },
  tab: {
    borderRadius: 12,
  },
  label: {
    fontSize: 10,
    marginTop: -3,
  },
  icon: {
    fontSize: 19,
    lineHeight: 22,
  },
});
