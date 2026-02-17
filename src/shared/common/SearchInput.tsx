import "../../pages/Dashboard/Dashboard.scss";


type SearchInputProps = {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;

}

function SearchInput({value, placeholder, onChange}: SearchInputProps) {
    return (
             <input
            type="text"
            placeholder={placeholder || "Search..."}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
       
    )
}

export default SearchInput;