// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { QrScanner } from 'react-qrcode-scanner';
import { putInvitation } from '../../api/axios';
import { Stack, Button, Typography } from '@mui/material';

const QRscan = () => {
  const [eventqr, setEvent] = useState('');
  const [emailqr, setEmail] = useState('');
  const [facingMode, setFacingMode] = useState('front');
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);

  const handleScan = async (data) => {
    setLoadingScan(true);
    console.log("Codigo escaneado: "+data);

    if (data && data !== '') {
      const json = JSON.parse(data);
      setStartScan(false);
      setLoadingScan(false);
      setEmail(json.email);
      
      setEvent(json.event);
     
      const form = {
          event: json.event,
          email: json.email,
      };

      console.log('form '+form)

      const response = await putInvitation(form);


      setEmail('');
      setEvent('');

      if (response.msg == 'Ya asistío') {
        alert('Ya asistío');
        return;
      }
      if (response.msg == 'ok') {
        alert('Confirmado');
      }
    }
  };

  const handleError = (error) => {
    console.log({ error });
  };

  return (
    <Stack
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={2}
      sx={{ width: '100%' }}
      margin={'10% 0'}
      overflow={'hiden'}
     
    >
      <select
        style={{
          display: { xs: 'none', md: 'block' },
          backgroundColor: '#fff',
          borderRadius: '5px',
          border: 'none',
          color:'green'
        }}
        onChange={(e) => setFacingMode(e.target.value)}
        value={facingMode}
      >
        <option value="front">Front</option>
        <option value="rear">Rear</option>
      </select>
      <Button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? 'Stop Scan' : 'Start Scan'}
      </Button>

      {startScan && (
        <>
          <Typography>Lee el codigo QR </Typography>
          <QrScanner
            videoConstraints={{
              width: { min: 640, ideal: 1280, max: 1920 },
              height: { min: 480, ideal: 720, max: 1080 },
              facingMode: facingMode,
              aspectRatio: { ideal: 1, max: 2 },
              //no mirror image
            }}
            delay={9000}
            onError={handleError}
            onScan={handleScan}
            aspectRatio={'16:9'}
            style={{
              marginLeft: '-10%',
              width: '110%',      
              height: '80%',
            }}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
    </Stack>
  );
};

export default QRscan;
