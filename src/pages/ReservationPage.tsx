import React from 'react';
import {ReservationForm} from '../components/ReservationForm';
import {Layout} from '../components/Layout/Layout';

function ReservationPage () {
  return (
    <Layout>
      <ReservationForm existingData={undefined} isEdit={undefined} />
    </Layout>
  );
};

export  {ReservationPage};
