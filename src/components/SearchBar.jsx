import { useState } from 'react';
import Input from './input';
import Button from './button';

const SearchBar = () => {
    const [value, setValue] = useState('');

    const handleSearch = () => {
        console.log('Search query:', value);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent:"center", borderRadius: 20, overflow: "hidden"}}>
            <Input
                label="Search"
                variant="outlined"
                value={value}
                onChange={setValue}
                textwithin
                style={{padding: 6, borderRadius: "20px 0 0 20px", outline: "none", marginRight:0}}
                divStyle={{borderRadius: "20px 0 0 20px", marginRight:0}}
            />
            <Button variant={3} onClick={handleSearch} style={{borderRadius: "0 20px 20px 0",paddingHorizontal:"30px", marginLeft:0,borderColor:"var(--gradient)"}}>
                <i className={"fa-solid fa-search"} style={{color:"var(--color)"}}/>
            </Button>
        </div>
    );
};

export default SearchBar;
