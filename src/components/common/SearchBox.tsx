import styled from "styled-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function SearchBox({ value, onChange }: Props) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
}

export default SearchBox;

const Input = styled.input`
  border: none;
  outline: none;
  height: 24px;
  padding: 8px 0;
  border-bottom: 2px solid #eee;
  margin-bottom: 24px;
  font-size: 16px;
`;
