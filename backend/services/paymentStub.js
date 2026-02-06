// Payment stub — replace with Stripe/PayPal integration
module.exports = {
  charge: async ({ amount, currency='usd', source, description }) => {
    // Simulate a successful charge
    return { id: 'ch_mock_123', status: 'succeeded', amount, currency, description };
  }
};
