import * as React from 'react';
import { PropsWithChildren } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useCurrentUserContext } from '../useCurrentUserContext';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

type Props = PropsWithChildren & {
  title: string;
};

export default function Page<T extends Props>(props: T) {
  const { CurrentUserContext, currentUser } = useCurrentUserContext();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Material UI Vite.js example in TypeScript
          </Typography>
          {props.children}
          <Copyright />
        </Box>
      </Container>
    </CurrentUserContext.Provider>
  );
}
