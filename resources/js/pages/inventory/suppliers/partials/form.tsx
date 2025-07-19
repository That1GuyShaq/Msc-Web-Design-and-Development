
import axios from 'axios';
import { toast } from "sonner";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Supplier } from '@/types/modules/inventory';
import { useState , useMemo, useEffect } from "react";
import { ChevronsUpDown, Loader2, Check } from "lucide-react";
import { City, Country, StateProvince, Tenant } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function SupplierForm({ supplier, tenant, countries }: { supplier?: Supplier, tenant: Tenant, countries: Country[] }) {

    const editing = Boolean(supplier);

    const [countryValue, countrySetValue]                         = useState("");
    const [countriesOpen, countriesSetOpen]                       = useState(false);
 
    const [statesProvincesOpen, statesProvincesSetOpen]           = useState(false);
    const [stateProvinceValue, stateProvinceSetValue]             = useState("");
    const [statesProvincesDisabled, statesProvincesSetDisabled]   = useState(true);
    const [statesProvinces, statesProvincesSet]                   = useState<StateProvince[]>([]);
    const [isLoadingStatesProvinces, setisLoadingStatesProvinces] = useState(false);

    const [citiesOpen, citiesSetOpen]                             = useState(false);
    const [cityValue, citySetValue]                               = useState("");
    const [citiesDisabled, citiesSetDisabled]                     = useState(true);
    const [cities, citiesSet]                                     = useState<City[]>([]);
    const [isLoadingCities, setisLoadingCities]                   = useState(false);


    const { data, setData, post, put, errors, processing } = useForm({
        slug: supplier?.slug ?? '',
        name: supplier?.name ?? '',
        email: supplier?.email ?? '',
        phone: supplier?.phone ?? '',
        country: supplier?.country ?? '',
        state_province: supplier?.state_province ?? '',
        city: supplier?.city ?? '',
        address: supplier?.address ?? '',
        zip_postal_code: supplier?.zip_postal_code ?? '',
        description: supplier?.description ?? '',
        website: supplier?.website ?? '',
        notes: supplier?.notes??  ''
    });

    useEffect(() => {
        if (editing && supplier) {
            countrySetValue(supplier.country);
        }
    }, [editing, supplier]);

    const countriesByRegion = useMemo(() => {
        return countries.reduce((acc, country) => {
            if (!acc[country.region]) {
                acc[country.region] = [];
            }
            acc[country.region].push(country);
            return acc;
        }, {} as Record<string, Country[]>);
    }, [countries]);

    useEffect(() => {
        if (data.country) {
            const country_code = countries.find(country => country.name === data.country)?.iso2;

            stateProvinceSetValue('');
            setData('state_province', '');
            statesProvincesSetDisabled(true);
            setisLoadingStatesProvinces(true);

            citySetValue('');
            setData('city', '');
            citiesSetDisabled(true);

            axios.get(route('world.states', { country_code: country_code }))
            .then(response => {
                if (response.status === 200) {
                    statesProvincesSet(response.data);
                    statesProvincesSetDisabled(response.data.length === 0);
                        
                        if (editing && supplier?.state_province) {
                            stateProvinceSetValue(supplier.state_province);
                            setData("state_province", supplier.state_province);
                        }
                }
            }).catch(error => {
                const indevidual = toast.error(error.message, {
                    description: "Failed to fetch states or provinces. Reload and try again?",
                    closeButton: true,
                    duration: 50000,
                    action: {
                        label: "close",
                        onClick: () => toast.dismiss(indevidual),
                    },
                });
            }).finally(() => setisLoadingStatesProvinces(false));
        }
    }, [data.country]);
    
    useEffect(() => {
        if (stateProvinceValue) {
            const state_id = statesProvinces.find(state => state.name === stateProvinceValue)?.id;
            citySetValue('');
            citiesSetDisabled(true);
            setisLoadingCities(true);

            axios.get(route('world.cities', { state_id: state_id }))
                .then(response => {
                    if (response.status === 200) {
                        citiesSet(response.data);
                        citiesSetDisabled(response.data.length === 0);

                        if (editing && supplier?.city) {
                            citySetValue(supplier.city);
                            setData("city", supplier.city);
                        }
                    }
            }).catch(error => {
                const indevidual = toast.error(error.message, {
                    description: "Failed to fetch states or provinces. Reload and try again?",
                    closeButton: true,
                    duration: 50000,
                    action: {
                        label: "close",
                        onClick: () => toast.dismiss(indevidual),
                    },
                });
            }).finally(() => setisLoadingCities(false));
        }
    }, [data.state_province]);


    const submit: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (editing) {
            put(route('inventory.suppliers.update', { tenant: tenant.id, supplier: supplier?.slug }), { 
                preserveScroll: true,
            });
        } else {
            post(route('inventory.suppliers.store', { tenant: tenant.id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="h-full flex-1 flex-col gap-4 rounded-2xl p-4 grid lg:grid-cols-6">
            <form onSubmit={submit} className="col-start-2 col-end-6 grid auto-rows-min gap-4 lg:grid-cols-4">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{editing ? "Update supplier" : "Add supplier"}</CardTitle>
                        <CardDescription>Please enter the suppliers information below.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid auto-rows-min gap-4 lg:grid-cols-6">
                        <div className="col-span-6 grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                autoFocus
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                        
                        <div className="col-span-4 grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)} />
                            <InputError message={errors.email} />
                        </div>
                        
                        <div className="col-span-2 grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                placeholder="+1 (123) 456-7890"
                                onChange={(e) => setData('phone', e.target.value)}
                                pattern="^\+\d{1,3}[\s.\-]*\(?\d{1,4}\)?[\s.\-]*\d{1,4}[\s.\-]*\d{1,9}$" />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="col-span-2 grid gap-2">
                            <Label htmlFor="country">Country</Label>
                            <Popover open={countriesOpen} onOpenChange={countriesSetOpen}>
                                <PopoverTrigger asChild>
                                    <Button type="button" id="country" variant="outline" role="combobox" aria-expanded={countriesOpen} className="justify-between" >
                                        {editing ? data.country || "Select country..." : countryValue || "Select country..."}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                    <Command>
                                    <CommandInput placeholder="Search country..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No countries found.</CommandEmpty>
                                        {Object.entries(countriesByRegion).map(([region, regionCountries]) => (
                                            <CommandGroup  key={region} heading={region}>
                                                {regionCountries.map((country) => (
                                                    <CommandItem
                                                        key={country.id}
                                                        value={country.name}
                                                        className="ml-6"
                                                        onSelect={(currentValue) => {
                                                            countrySetValue(currentValue === countryValue ? "" : currentValue)
                                                            setData('country', currentValue)
                                                            countriesSetOpen(false)
                                                        }}
                                                    >
                                                        {country.name}
                                                        <Check className={`ml-auto h-4 w-4 ${countryValue === country.name ? "opacity-100" : "opacity-0" }`} />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        ))}
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.country} />
                        </div>

                        <div className="col-span-2 grid gap-2">
                            <Label htmlFor="state_province">State/Province</Label>
                            <Popover open={statesProvincesOpen} onOpenChange={statesProvincesSetOpen}>
                                <PopoverTrigger asChild>
                                        <Button type="button" id="state_province" variant="outline" role="combobox" aria-expanded={statesProvincesOpen} className="justify-between" disabled={statesProvincesDisabled}>
                                            {isLoadingStatesProvinces ? (<><Loader2 className="animate-spin mr-2 h-4 w-4"/> Loading…</>) : (editing ? data.state_province || "Select state or province..." : stateProvinceValue || (statesProvinces.length === 0 ? "No states or provinces found." : "Select state or province..."))}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                    <Command>
                                    <CommandInput placeholder="Search states or provinces..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No states or provinces found.</CommandEmpty>
                                        <CommandGroup>
                                                {statesProvinces.map((state_province) => (
                                                    <CommandItem
                                                        key={state_province.id}
                                                        value={state_province.name}
                                                        className="ml-6"
                                                        onSelect={(currentValue) => {
                                                            stateProvinceSetValue(currentValue === stateProvinceValue ? "" : currentValue)
                                                            setData('state_province', currentValue)
                                                            statesProvincesSetOpen(false)
                                                        }}
                                                    >
                                                        {state_province.name}
                                                        <Check className={`ml-auto h-4 w-4 ${stateProvinceValue === state_province.name ? "opacity-100" : "opacity-0" }`} />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.state_province} />
                        </div>

                        <div className="col-span-2 grid gap-2">
                            <Label htmlFor="cities">City</Label>
                            <Popover open={citiesOpen} onOpenChange={citiesSetOpen}>
                                <PopoverTrigger asChild>
                                    <Button type="button" id="cities" variant="outline" role="combobox" aria-expanded={citiesOpen} className="justify-between" disabled={citiesDisabled}>
                                        {isLoadingCities ? (<><Loader2 className="animate-spin mr-2 h-4 w-4"/> Loading…</>) : (editing ? data.city || "Select city..." : cityValue || (cities.length === 0 ? (data.state_province + "has no cities.") : "Select city...")) }
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                    <Command>
                                    <CommandInput placeholder="Search cities..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No cities found.</CommandEmpty>
                                        <CommandGroup>
                                                {cities.map((city) => (
                                                    <CommandItem
                                                        key={city.id}
                                                        value={city.name}
                                                        className="ml-6"
                                                        onSelect={(currentValue) => {
                                                            citySetValue(currentValue === cityValue  ? "" : currentValue)
                                                            setData('city', currentValue)
                                                            citiesSetOpen(false)
                                                        }}
                                                    >
                                                        {city.name}
                                                        <Check className={`ml-auto h-4 w-4 ${cityValue === city.name ? "opacity-100" : "opacity-0" }`} />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.city} />
                        </div>

                        <div className="col-span-4 grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={data.address}
                                className='h-32'
                                onChange={(e) => setData('address', e.target.value)} />
                            <InputError message={errors.address} />
                        </div>

                        <div className="col-span-2 grid gap-2">
                            <Label htmlFor="zip_postal_code">Zip/Postal Code</Label>
                            <Input
                                id="zip_postal_code"
                                type="text"
                                value={data.zip_postal_code}
                                onChange={(e) => setData('zip_postal_code', e.target.value)} />
                            <InputError message={errors.zip_postal_code} />
                            
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                type="url"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)} />
                            <InputError message={errors.website} />
                        </div>

                        <div className="col-span-2 grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                className='h-32'
                                onChange={(e) => setData('notes', e.target.value)} />
                            <InputError message={errors.notes} />
                        </div>

                        <div className="col-span-4 grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                className='h-32'
                                onChange={(e) => setData('description', e.target.value)} />
                            <InputError message={errors.description} />
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-end'>
                        <Button type="submit" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {editing ? 
                                <>{processing ? "Updating..." : "Update"}</>
                            : 
                                <>{processing ?  "Saving..." : "Save"}</>
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}