import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { encode } from 'base-64';

const Paypal = ({route, navigation}) => {
  const { paypalPrice } = route.params;
  const [accessToken, setAccessToken] = useState(null);
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    const clientId = 'Ac3-axXN8lEDAf8keoZjhSLIKmbQo3lxMOtxzmCzmMVkQEZ4YesmeN4mc2-22XeJtsW-f6qiLMWV9r5l';
    const clientSecret = 'ECdurGsDgP-gtl8sPSZ1wZTtCGhxAGGA-WdE5JotcXwbUC0lMvCAMxA9AsHHi_RcHunLrfwBDWfAneSz';
    const baseUrl = 'https://api-m.sandbox.paypal.com';

    const auth = encode(`${clientId}:${clientSecret}`);
    const dataDetail = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: paypalPrice.toFixed(2),
          }
        }
      ]
    };

    axios
      .post(
        `${baseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((response) => {
        setAccessToken(response.data.access_token);

        axios
          .post(
            `${baseUrl}/v2/checkout/orders`,
            dataDetail,
            {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            const { id, links } = response.data;
            const approvalUrl = links.find((data) => data.rel === 'approve');

            setPaymentId(id);
            setApprovalUrl(approvalUrl.href);
          })
          .catch((err) => {
            console.log('Error creating order:', err);
          });
      })
      .catch((err) => {
        console.log('Error getting access token:', err);
      });
  }, []);

  const _onNavigationStateChange = (webViewState) => {
    if (webViewState.url.includes('https://example.com/')) {
      setApprovalUrl(null);

      const { PayerID, paymentId } = webViewState.url;

      axios
        .post(
          `${baseUrl}/v2/checkout/orders/${paymentId}/capture`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('Capture successful:', response);
        })
        .catch((err) => {
          console.log('Error capturing payment:', err);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {approvalUrl ? (
        <WebView
          source={{ uri: approvalUrl }}
          onNavigationStateChange={_onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default Paypal;
