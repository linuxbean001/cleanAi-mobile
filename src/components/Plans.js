import React from 'react';
import { ScrollView } from 'react-native';
import PlansCard from './PlansCard';
import Header from './Header';
import Footer from './Footer';

const Plans = () => {
  return (
    <>
      <ScrollView>
        <Header />
          <PlansCard
            title="Basic"
            description="You will get 10 Credits"
            price="10"
          />
          <PlansCard
            title="Premium"
            description="You will get 30 Credits"
            price="30"
          />
          <PlansCard
            title="Platinum"
            description="You will get 50 Credits"
            price="50"
          />
        <Footer />
      </ScrollView>
    </>
  );
};

export default Plans;
