import { useState } from 'react'
import { Container, Typography ,Box, TextField, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [emailContent, setEmailContent]=useState('');
  const [tone,setTone]=useState('');
  const [generatedReply, setGeneratedReply]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');

 

  async function handleSubmit()
  {
      setLoading(true);
      setError('');

       const obj={
        emailContent:emailContent,
        tone:tone
      }

      console.log(obj)
      try{

        const response=await fetch("http://localhost:8080/api/email/generate",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
          
            body:JSON.stringify(obj)
          }

        )

        const data= await response.text();
        setGeneratedReply(data)
        console.log(data)

      }catch(error)
      {
          setError('Failed to generate email. Please try again')
          console.log(error);
      }
      finally{
        setLoading(false);
      }
  }

  return (
    <>
      <Container maxWidth="md" sx={{py:4}}>

        <Typography variant='h3' component="h1" gutterBottom align='center'>
          Email Reply Generator
        </Typography>

        <Box >

          <TextField
          fullWidth
          multiline
          rows={3}
          variant='outlined'
          placeholder='Write an email content to generate reply'
          value={emailContent || ''}
          onChange={(e)=>setEmailContent(e.target.value)}
          sx={{mb:2}}
          />

          <FormControl fullWidth sx={{mb:2}}>
            <InputLabel>
            Tone(Optional)
            </InputLabel>
            <Select
            value={tone || ''}
            label={"Tone   (Optional)"}
            onChange={(e)=>setTone(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>

          </FormControl>

          <Button
          variant='contained'
          fullWidth
          disabled={!emailContent || loading}
          onClick={handleSubmit}
         >
           {loading ? <CircularProgress size={24}/> : "Generate Reply"}
            
          </Button>

           
          {error && (
            <Typography color='error' sx={{mb:2}}>{error}</Typography>
          )}

          

          {generatedReply && (
              
              <Box sx={{mt:3}}>
                  <Typography>Generated Reply: </Typography>

                  <TextField
                  fullWidth
                  multiline
                  rows={15}
                  variant='outlined'
                  value={generatedReply || ''}
                  >
                    
                  </TextField>
              </Box>

          )}

          <Button onClick={()=> navigator.clipboard.writeText(generatedReply)}
            variant='outlined'
            sx={{mt:2}}
          >
            Copy to clipboard
          </Button>



        </Box>

       


      </Container>
    </>
  )
}

export default App
