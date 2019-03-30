export const styles = (theme) => ({
    /*
      START: sticky footer implementation
     */
    app: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column'
    },
    body: {
        margin: '0px'
    },
    /*
      END: sticky footer implementation
     */

    holyGrail: {
        flex: 1,
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
    },
    holyGrailHeader: {
        flex: 'none',
        padding: '1.5rem',
        background: '#404040',
        color: '#999',
        fontSize: '.85em',
        textAlign: 'center'
    },
    holyGrailFooter: {
        flex: 'none',
        padding: '1.5rem',
        background: '#404040',
        color: '#999',
        fontSize: '.85em',
        textAlign: 'center'
    },
    holyGrailBody: {
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'column',
        padding: '1.5em',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
        },
    },
    holyGrailContent: {
        marginTop: '1.5em',
        [theme.breakpoints.up('md')]: {
            flex: 1,
            padding: '0 2em',
            margin: 0
        },
    },
    holyGrailNav: {
        order: -1,
        padding: '1em',
        borderRadius: '3px',
        background: 'rgba(147, 128, 108, 0.1)',
        [theme.breakpoints.up('md')]: {
            flex: '0 0 12em'
        },
    },
    holyGrailAds: {
        padding: '1em',
        borderRadius: '3px',
        background: 'rgba(147, 128, 108, 0.1)',
        [theme.breakpoints.up('md')]: {
            flex: '0 0 12em'
        },
    }
});
