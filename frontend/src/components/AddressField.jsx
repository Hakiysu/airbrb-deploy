import { TextField, Grid } from '@mui/material';

function AddressField({ address, setAddress }) {
  const handleChange = (field) => (e) => {
    setAddress({ ...address, [field]: e.target.value });
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid sx ={{ gridColumn: 'span 12' }}>
        <TextField
          label="Street"
          value={address.street ?? ""}
          autoComplete="address-line1"
          onChange={handleChange('street')}
          fullWidth
        />
      </Grid>
      <Grid sx ={{ gridColumn: 'span 12' }}>
        <TextField
          label="City"
          value={address.city ?? ""}
          autoComplete="address-level2"
          onChange={handleChange('city')}
          fullWidth
        />
      </Grid>
      <Grid sx ={{ gridColumn: 'span 12' }}>
        <TextField
          label="State"
          value={address.state ?? ""}
          autoComplete="address-level1"
          onChange={handleChange('state')}
          fullWidth
        />
      </Grid>
      <Grid sx ={{ gridColumn: 'span 12' }}>
        <TextField
          label="ZIP"
          value={address.zip ?? ""}
          autoComplete="postal-code"
          onChange={handleChange('zip')}
          fullWidth
        />
      </Grid>
      <Grid sx ={{ gridColumn: 'span 12' }}>
        <TextField
          label="Country"
          value={address.country ?? ""}
          autoComplete="country-name"
          onChange={handleChange('country')}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default AddressField;