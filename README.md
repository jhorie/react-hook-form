# 📋 React forme  🚧 (under development)

## Install

    $ npm install react-forme

## Quickstart

```jsx
import useForm from 'react-forme';

function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => { console.log(data); }
    
    return <form onSubmit={handleSubmit(onSubmit}>
        <input name="firstname" ref={(ref) => register({ ref, required: true })} />
        <input name="lastname" ref={(ref) => register({ ref, pattern: "[a-z]{1,15}" })} />
        <input type="submit" />
    </form>
}

```
