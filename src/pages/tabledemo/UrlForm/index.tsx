import { JSX } from 'react';
import { TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import useViewModel from './ViewModel';

export default function UrlForm(): JSX.Element {
    const viewModel = useViewModel();

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 800,
                mx: 'auto',
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: 'background.paper',
            }}
        >
            <Typography variant="h6" gutterBottom>
                API Configuration
            </Typography>

            {/* Form Row: API URL Label, Input Field, and Button */}
            <Box
                component="form"
                onSubmit={(e) => { e.preventDefault(); viewModel.handleClick(); }} // Prevent default form submit on Enter key
                sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2,
                }}
                noValidate
                autoComplete="off"
            >
                {/* Label is integrated into the TextField via the label prop */}
                <TextField
                    label="Url"
                    variant="outlined"
                    fullWidth
                    value={viewModel.state.url}
                    onChange={viewModel.handleChange as unknown as React.ChangeEventHandler<HTMLInputElement>} // MUI TextField type
                    // Visual size is handled by fullWidth. Input length is handled by value/onChange logic.
                    // max 255 visual size is usually handled by width/max-width, which fullWidth and the Box container manage responsively.
                    slotProps={{
                        // The input can take a value of any length, but this can provide a visual hint if needed
                        htmlInput: { maxLength: 5000 } // Arbitrarily large length to respect "can take a value of any length"
                    }}
                    error={!viewModel.state.isValid}
                    helperText={
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center', minHeight: 10 }}>
                        {/* Optional: Add a helper text here if needed, otherwise leave TextField helperText empty */}
                        </Box>
                    }
                    sx={{ flexGrow: 1 }}
                    required={true}
                />

                {/* Apply Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={viewModel.handleClick}
                    size="large"
                    sx={{
                        height: '56px', // Match TextField height for alignment
                        minWidth: { xs: '100%', sm: '120px' },
                    }}
                >
                Apply
                </Button>
            </Box>

            {/* Notification Message */}
            <Box
                sx={{
                mt: 2,
                minHeight: '20px',
                display: 'flex',
                alignItems: 'center',
                opacity: viewModel.state.validationMessage ? 1 : 0, // Fade out when empty
                transition: 'opacity 0.3s ease-in-out',
                }}
            >
                {viewModel.state.validationMessage && (
                <viewModel.state.statusIcon sx={{ mr: 1, color: viewModel.state.statusColour, fontSize: 18 }} />
                )}
                <Typography
                variant="body2"
                sx={{
                    color: viewModel.state.statusColour,
                    fontWeight: 500,
                }}
                >
                {viewModel.state.validationMessage}
                </Typography>
            </Box>
        </Box>
    );
}