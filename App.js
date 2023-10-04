import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import MyComponent from './MyComponent';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Khi ứng dụng được khởi động, đặt hẹn giờ để ẩn ActivityIndicator sau 6 giây
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => {
      // Xóa hẹn giờ nếu component unmounted trước khi hẹn giờ hoàn thành
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        // Nếu đang loading, hiển thị ActivityIndicator
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <>
          {/* Nếu không loading, hiển thị WebView và nút mở Modal */}
          <WebView
            source={{ uri: 'https://caodang.fpt.edu.vn/' }}
            style={{ flex: 1 }}
          />

          <Button
            title="Open Modal"
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </>
      )}

      <Modal

        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);

        }}
      >
        <View style={styles.modalContent}>

          <MyComponent />
          <Button
            title="Close Modal"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default App;
