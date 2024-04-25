import { TextInput, Select, FileInput, Button, ButtonGroup } from 'flowbite-react';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreateJournal() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl font-semibold my-7'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="Adventure">Adventure</option>
            <option value="Cruises">Cruises</option>
            <option value="Leisure">Leisure</option>
            <option value="Family">Family</option>
            <option value="Solo">Solo</option>
            <option value="Backpackers">Backpackers</option>
            <option value="Business">Business</option>
            <option value="Cultural">Cultural</option>
            <option value="Budget">Budget</option>
            <option value="Camping">Camping</option>
            <option value="Heritage">Heritage</option>
            <option value="Religious">Religious</option>
            <option value="Beach">Beaches</option>
            <option value="Wildlife">Wildlife</option>
          </Select>
        </div>
        <div className='gap-4 flex items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*'/>
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload image</Button>
        </div>
        <ReactQuill theme='snow' placeholder='Write something here..' className='h-72 mb-12' required/>
        <Button type='submit' gradientDuoTone='purpleToBlue'>Publish</Button>
      </form>  
    </div>
  )
}
