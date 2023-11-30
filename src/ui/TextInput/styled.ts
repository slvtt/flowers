export const textInputSx = {
  width: '100%',
  '& input': {
    height: 46,
    fontSize: 16,
    boxSizing: 'inherit',
    display: 'block',
    textAlign: 'center'
  },
  '& div:after': { borderColor: 'transparent !important' },
  '& div:before': { borderColor: 'transparent !important' },
  '& .MuiInputBase-root': {
    borderRadius: '100px',
    width: '100%',
    border: `1px solid`,
    borderColor: 'transparent'
  },
  '& .MuiInputBase-input': {
    borderRadius: '100px'
  },

  '& label': {
    width: '100%',
    fontWeight: '400',
    lineHeight: '20px',
    textAlign: 'center',
    marginTop: '-4px',
    transformOrigin: 'center',
    '&.Mui-active': {
      transformOrigin: 'center',
      fontSize: '10px',
      lineHeight: '12px',
      marginLeft: '-10px'
    }
  },
  '& p': {
    color: 'red',
    width: '100%',
    textAlign: 'center',
    paddingRight: '30px'
  },
  '& .MuiInputLabel-shrink': {
    marginLeft: '-12px'
  },
  '& .MuiInputAdornment-root': {
    position: 'absolute',
    right: '10px'
  },
  '& .MuiFilledInput-root': {
    paddingRight: 0
  },

  '& .Mui-error': {
    borderColor: 'red'
  }
};
