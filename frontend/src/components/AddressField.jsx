import { TextField, Box } from '@mui/material';

function AddressField({ address, setAddress }) {
  const handleChange = (field) => (e) => {
    setAddress({ ...address, [field]: e.target.value });
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      sx={{ mt: 2, flexWrap: 'wrap' }}
    >
      <TextField
        label="Street"
        value={address.street}
        autocomplete="address-line1"
        onChange={handleChange('street')}
        fullWidth
        sx={{ flex: 2 }}
      />
      <TextField
        label="City"
        value={address.city}
        autocomplete="address-level2"
        onChange={handleChange('city')}
        sx={{ flex: 1 }}
      />
      <TextField
        label="State"
        value={address.state}
        autocomplete="address-level1"
        onChange={handleChange('state')}
        sx={{ flex: 1 }}
      />
      <TextField
        label="ZIP"
        value={address.zip}
        autocomplete="postal-code"
        onChange={handleChange('zip')}
        sx={{ flex: 1 }}
      />
      <TextField
        label="Country"
        value={address.country}
        autocomplete="country-name"
        onChange={handleChange('country')}
        sx={{ flex: 1 }}
      />
    </Box>
  );
}

export default AddressField;
