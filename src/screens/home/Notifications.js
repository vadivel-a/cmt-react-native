import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Badge, Card, Divider, Avatar } from 'react-native-paper'; // Import Material UI components
import { COLORS } from '../../constants'; // Assuming you have COLORS defined
import moment from 'moment'; // For date and time formatting

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'You have a new message.', read: false, user: 'John Doe', timestamp: '2025-05-18T09:30:00Z' },
    { id: '2', message: 'Your order has been shipped.', read: true, user: 'Jane Smith', timestamp: '2025-05-17T15:00:00Z' },
    { id: '3', message: 'Reminder: Meeting at 3 PM today.', read: false, user: 'Michael Lee', timestamp: '2025-05-18T10:00:00Z' },
    { id: '4', message: 'New comment on your post.', read: true, user: 'Sarah Williams', timestamp: '2025-05-17T14:00:00Z' },
    { id: '5', message: 'New update available for your app.', read: false, user: 'Emma Clark', timestamp: '2025-05-18T08:00:00Z' },
  ]);

  // Format the timestamp to a readable date and time
  const formatDate = (timestamp) => moment(timestamp).format('MMM D, YYYY [at] h:mm A');

  const renderItem = ({ item }) => {
    return (
      <Card style={[styles.card, item.read ? styles.cardRead : styles.cardUnread]}>
        <View style={styles.cardContent}>
          <Avatar.Text size={40} label={item.user.charAt(0)} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={[styles.userName, item.read && styles.read]}>{item.user}</Text>
            <Text style={[styles.message, item.read && styles.read]}>{item.message}</Text>
            <Text style={[styles.timestamp, item.read && styles.read]}>
              {formatDate(item.timestamp)}
            </Text>
          </View>
          <Badge visible={!item.read} style={styles.badge}>New</Badge>
        </View>
        <Divider />
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  container: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  cardUnread: {
    backgroundColor: '#ddd', // Light blue for unread
  },
  cardRead: {
    backgroundColor: '#fff', // Slightly gray for read
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textColor,
  },
  message: {
    fontSize: 14,
    color: COLORS.textColor,
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  read: {
    color: COLORS.gray,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.primary,
  },
});

export default Notifications;
