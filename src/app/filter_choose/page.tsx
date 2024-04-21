"use client";
// app/filter_choose/page.tsx
import {
    Bird,
    CornerDownLeft,
    PersonStandingIcon,
    Box
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import MainLayout from "@/components/layout/MainLayout"
import { RootState } from "@/app/store/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setUser } from "@/app/store/userSlice"
import { useState } from "react"

import { createEmptyFilterRoute, createNewFilterRoute } from "@/app/api/sendData"
import { resetFilterToDefault } from "@/app/store/filterSlice"
import { getFilterRoute } from "@/app/api/getData"
import { Filter, FilterTarget } from "@/types/filter"
import { setFilter } from "@/app/store/filterSlice"

import ConversationMessage from "@/components/custom/conversationMessage";

export function Dashboard() {
    const filters = useSelector((state: RootState) => state.user.filters);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const [filter_id, setFilterId] = useState("")
    const [filter_name, setFilterName] = useState("")
    const [current_filter_name, setCurrentFilterName] = useState("")
    const [write_filter_name, setWriteFilterName] = useState("")
    const [filter_target, setFilterTarget] = useState("")
    const [return_cap, setReturnCap] = useState(20)
    const [filter_period, setFilterPeriod] = useState(7)
    const [only_search_specified_usernames, setOnlySpecifiedUsernames] = useState(false)
    const [filter_prompt, setFilterPrompt] = useState("")
    const [usernames, setUsernames] = useState<string>("")
    const [primary_prompt, setPrimaryPrompt] = useState("")
    const [report_guide, setReportGuide] = useState("")
    const [message, setMessage] = useState("")
    const [keyword_groups, setKeywordGroups] = useState("")
    const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
    console.log("only_search_specified_usernames value: ", only_search_specified_usernames)
    console.log("filter_target value: ", filter_target)
    console.log("filter_name value: ", filter_name)

    const makeNewEmptyFilter = async (new_filter_name: string) => {
        console.log("new_filter_name in makeNewEmptyFilter: " + new_filter_name)
        const data = await createEmptyFilterRoute(new_filter_name)
        console.log("received data from newFilterName: ", data)
        const user = data.user
        const empty_filter = data.filter

        dispatch(setFilter(empty_filter));
        dispatch(setUser(user));
        dispatch(resetFilterToDefault())

        setFilterId(empty_filter.id)
        setFilterName(new_filter_name)
        setFilterTarget("tweets")
        setReturnCap(20)
        setFilterPeriod(7)
        setFilterPrompt("")
        setOnlySpecifiedUsernames(false)
        setUsernames("")
        setPrimaryPrompt("")
        setReportGuide("")
        setMessages([])
        setKeywordGroups("")
    }

    const makeNewFilter = async () => {
        const filter: Filter = {
            id: filter_id,
            user_id: user.id,
            name: filter_name,
            target: filter_target as FilterTarget,
            primary_prompt: primary_prompt,
            report_guide: report_guide,
            filter_period: filter_period,
            filter_prompt: filter_prompt,
            usernames: usernames.split(","),
            only_search_specified_usernames: only_search_specified_usernames,
            return_cap: return_cap,
            keyword_groups: keyword_groups.substring(2, keyword_groups.length - 2).split("], [").map(group => group.split(", ")),
            messages: []
        }
        createNewFilterRoute(filter)
    }

    const setCurrentFilter = async (filter_id: string) => {
        const filter = await getFilterRoute(filter_id)
        dispatch(setFilter(filter));
        setFilterId(filter.id)
        setFilterName(filter.name)
        setFilterTarget(filter.target)
        setReturnCap(filter.return_cap)
        setFilterPrompt(filter.filter_prompt)
        setFilterPeriod(filter.filter_period)
        setOnlySpecifiedUsernames(filter.only_specified_usernames)
        setUsernames(filter.usernames.length > 0 ? filter.usernames.join(",") : "")
        setPrimaryPrompt(filter.primary_prompt)
        setReportGuide(filter.report_guide)
        setMessages(filter.messages)
        if (filter.keyword_groups.length === 0) {
            setKeywordGroups("");
        } else {
            const keywordGroupsString = filter.keyword_groups.map((group: string[]) => `[${group.join(", ")}]`).join(", ");
            setKeywordGroups(`[${keywordGroupsString}]`);
        }
    }

    // const testStuff = () => {
    //     setFilterName("test_filter")
    //     setFilterTarget("reports")
    //     setOnlySpecifiedUsernames(true)
    // }

    return (
        <MainLayout>
            <div className="grid h-screen" style={{ width: 'calc(100vw - 50px)' }}>
                <div className="flex flex-col h-full">
                    <main className="flex flex-1 overflow-hidden p-4 grid-cols-3 gap-4" style={{ display: 'grid' }}>
                        <div
                            className="relative flex flex-col items-start gap-8 overflow-y-auto"
                            style={{ height: 'calc(100vh - 100px)' }} // Set the height and enable internal scrolling
                        >
                            <form className="grid w-full items-start gap-6">
                                <div className="grid gap-3 w-[50%] justify-center">
                                    <Select
                                        value={current_filter_name}
                                        onValueChange={(value) => {
                                            setCurrentFilterName(value);  // Update state when the value changes
                                            setCurrentFilter(value);  // Update state when the value changes
                                        }}
                                    >
                                        <Label htmlFor="choose_your_filter">Choose your filter</Label>
                                        <SelectTrigger id="filter_name" className="items-start [&_[data-description]]:hidden">
                                            <SelectValue placeholder={filter_name} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(filters ?? {}).length > 0 ? (
                                                Object.entries(filters ?? {}).map(([key, value]) => (
                                                    <SelectItem key={key} value={key}>
                                                        <div className="flex items-start gap-3 text-muted-foreground grid gap-0.5" >
                                                            {value}
                                                        </div>
                                                    </SelectItem>
                                                ))
                                            ) : (<SelectItem value="none">No filters available</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Textarea
                                    id="new_filter_name"
                                    placeholder="Name your new filter..."
                                    value={write_filter_name}
                                    onChange={(e) => setWriteFilterName(e.target.value)}
                                    className="min-h-12 w-[80%] mx-auto resize-none border-0 p-3 shadow-none ring-1 mb-2" // Adjusted margin-bottom to bring elements closer
                                />

                                <div className="flex items-center p-3 pt-0">
                                    <Button type="submit" size="sm" className="ml-auto" onClick={(e) => {
                                        e.preventDefault();
                                        makeNewEmptyFilter(write_filter_name);
                                    }}>
                                        Create New Filter
                                        <CornerDownLeft className="size-0.5" />
                                    </Button>
                                </div>

                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        Filter Settings
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="filter_target">Filter Target*</Label>
                                        <Select
                                            value={filter_target} // Control the current selected value
                                            onValueChange={(value) => {
                                                setFilterTarget(value);  // Update state when the value changes
                                            }}
                                        >
                                            <SelectTrigger
                                                id="filter_target"
                                                className="items-start [&_[data-description]]:hidden"
                                            >
                                                <SelectValue placeholder="Select a filter target" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="tweets">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Bird className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                <span className="font-medium text-foreground">
                                                                    Tweets
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                Filter for tweets.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="users">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <PersonStandingIcon className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                <span className="font-medium text-foreground">
                                                                    Users
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                Filter for users. You can choose to get reports for users.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="reports">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Box className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                <span className="font-medium text-foreground">
                                                                    Reports
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                Get regular reports on tweets that match your filter.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="return_cap">Tweets/Users Cap</Label>
                                            <Input id="return_cap" placeholder="20" value={return_cap} onChange={(e) => setReturnCap(Number(e.target.value))} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="filter_period">Filter Period in Days</Label>
                                            <Input id="filter_period" type="number" placeholder="7" value={filter_period} onChange={(e) => setFilterPeriod(Number(e.target.value))} />
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="only_specified_usernames">Only specified usernames</Label>
                                        <div>
                                            <Select
                                                defaultValue="no"
                                                value={only_search_specified_usernames ? "yes" : "no"} // Bind state to the Select value
                                                onValueChange={(value) => {
                                                    setOnlySpecifiedUsernames(value === "yes"); // Update state when the value changes
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="yes">Yes</SelectItem>
                                                    <SelectItem value="no">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="usernames">Usernames</Label>
                                        <Input
                                            id="usernames"
                                            type="text"
                                            placeholder="@elonmusk, @jack, @sundarpichai"
                                            value={usernames}
                                            onChange={(e) => setUsernames(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="keyword_groups">Keyword Groups</Label>
                                        <Textarea
                                            id="keyword_groups"
                                            placeholder="[[cats, love], [nature, photography], [food]]"
                                            className="min-h-[5.5rem]"
                                            value={keyword_groups}  // Bind value to state
                                            onChange={e => setKeywordGroups(e.target.value)}  // Handle changes
                                        />
                                    </div>
                                </fieldset>
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        Prompts
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="primary_prompt">Primary Prompt*</Label>
                                        <Textarea
                                            id="primary_prompt"
                                            placeholder="Enter your primary prompt here..."
                                            className="min-h-[9.5rem]"
                                            value={primary_prompt}  // Bind value to state
                                            onChange={e => setPrimaryPrompt(e.target.value)}  // Handle changes
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="filter_prompt">Filter Prompt*</Label>
                                        <Textarea
                                            id="filter_prompt"
                                            placeholder="Enter your filter prompt here..."
                                            className="min-h-[9.5rem]"
                                            value={filter_prompt}  // Bind value to state
                                            onChange={e => setFilterPrompt(e.target.value)}  // Handle changes
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="report_guide">Report Guide*</Label>
                                        <Textarea
                                            id="report_guide"
                                            placeholder="Enter your report guide here..."
                                            className="min-h-[9.5rem]"
                                            value={report_guide}  // Bind value to state
                                            onChange={e => setReportGuide(e.target.value)}  // Handle changes
                                        />
                                    </div>
                                </fieldset>
                            </form>
                            <Button type="submit" className="mx-auto" onClick={() => makeNewFilter()}>
                                Create Filter
                            </Button>
                            {/* <Button type="submit" className="mx-auto" onClick={() => testStuff()}>
                                Test Button
                            </Button> */}
                        </div>

                        <div
                            className="relative flex flex-col h-[calc(100vh - 100px)] bg-muted/50 p-4 rounded-xl overflow-hidden lg:col-span-2"
                            style={{ boxSizing: 'border-box' }} // Ensures padding is included in the height calculation
                        >
                            <Badge variant="outline" className="absolute right-3 top-3">
                                Output
                            </Badge>
                            <div className="flex flex-col flex-1 min-h-0"> {/* Ensures flex container consumes available space and does not shrink below its minimum height */}
                                <div className="flex-1 overflow-y-auto space-y-4"> {/* Flex container for messages */}
                                    {messages.map((message, index) => (
                                        <div key={index} className="py-4"> {/* Add padding to create space between messages */}
                                            <ConversationMessage text={message.content} role={message.role} />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto" style={{ height: '140px' }}> {/* Fixed height for input area and push it to the bottom using mt-auto */}
                                    <form
                                        className="h-full relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                                    >
                                        <Label htmlFor="message" className="sr-only">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Type your message here..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 w-full"
                                        />
                                        <div className="flex items-center p-3 pt-0">
                                            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                                Send Message
                                                <CornerDownLeft className="size-3.5" />
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </main>
                </div>
            </div>
        </MainLayout>
    )
}

export default Dashboard
