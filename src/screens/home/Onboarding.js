import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, IMGS } from '../../constants';
import ButtonStyles from '../../styles/ButtonStyles';

const { width, height } = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);

  const slides = [
    {
      title: 'Welcome to App',
      description: 'Discover new features and functionalities.',
      image: IMGS.Onboarding1,
    },
    {
      title: 'Track Your Progress',
      description: 'Monitor your activities and performance easily.',
      image: IMGS.Onboarding2,
    },
    {
      title: 'Stay Connected',
      description: 'Stay up-to-date with the latest news.',
      image: IMGS.Onboarding3,
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: width * (currentSlide + 1),
          animated: true,
        });
      }
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffsetX / width);
          setCurrentSlide(index);
        }}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentSlide === index && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleNext} style={ButtonStyles.primaryCircle}>
        <Text style={ButtonStyles.primaryCircleText}>
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height,
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
    marginBottom: 30,
    borderRadius: 10,  // Round corners for images
    borderWidth: 2,  // Border for extra fancy styling
    borderColor: COLORS.grayLight,  // Match border color with primary
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',  // Custom font for style
  },
  description: {
    fontSize: 18,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 25,
    fontFamily: 'Roboto',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.gray,
    margin: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
});
