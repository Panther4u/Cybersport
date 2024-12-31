import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import { Box, useTheme, Button } from '@mui/material';
import { useState } from 'react';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const ProductBanner = ({ images = [] }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    if (!images.length) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <p>No images available</p>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <AutoPlaySwipeableViews
                style={{ overflow: 'hidden' }}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((image, index) => (
                    <Box
    key={index}
    component="img"
    sx={{
        width: '100%',
        height: {
            xs: '200px', // Extra small devices (phones)
            sm: '250px', // Small devices (tablets)
            md: '300px', // Medium devices (small laptops)
            lg: '400px', // Large devices (desktops)
            xl: '500px', // Extra large devices (large screens)
        },
        objectFit: 'cover', // Ensures images fill the space without distortion
        display: Math.abs(activeStep - index) <= 2 ? 'block' : 'none',
        borderRadius: '8px', // Optional: Adds rounded corners for styling
    }}
    src={image}
    alt={`Banner Image ${index + 1}`}
/>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{ justifyContent: 'space-between', background: 'transparent' }}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        Back
                    </Button>
                }
            />
        </Box>
    );
};
