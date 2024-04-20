import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface UserTypeSelectProps {
    value: string;
    onChange: (value: string) => void;
}

const AgentTypeSelect: React.FC<UserTypeSelectProps> = ({ value, onChange }) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="What are you?" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>User Types</SelectLabel>
                    <SelectItem value="solo-agent">Solo Agent</SelectItem>
                    <SelectItem value="broker">Broker</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default AgentTypeSelect;
