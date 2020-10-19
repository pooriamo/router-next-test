import { createMuiTheme }  from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                'html, body, #__next': {
                    minHeight: '100vh'
                },
            },
        },
    },
});

export default theme
