'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Check, ChevronsUpDown } from 'lucide-react';

import { ModalSheetContext } from '@/context/modal-sheet-context';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import ControllerLabel from '@/components/controller-label/controller-label';

interface SheetFormProps {
  form: UseFormReturn<any>;
  inputs?: string[];
  image?: boolean;
  department?: boolean;
  location?: boolean;
  employee?: boolean;
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (values: any) => void;
}

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const SheetForm: React.FC<SheetFormProps> = ({
  form,
  inputs,
  department,
  location,
  employee,
  isEditing,
  isLoading,
  onSubmit,
}) => {
  const { locations, departments, employees, clients, elementId } =
    useContext(ModalSheetContext);

  const currentClient = clients.find((client) => client.id === elementId);

  const currentEmployee =
    employees.find((employee) => employee.id === elementId) ||
    employees.find((employee) => employee.id === currentClient?.employeeId);

  const [openDepartmentController, setOpenDepartmentController] = useState(false);
  const [valueDepartmentController, setValueDepartmentController] = useState('');
  const [openLocationController, setOpenLocationController] = useState(false);
  const [valueLocationController, setValueLocationController] = useState('');
  const [openEmployeeController, setOpenEmployeeController] = useState(false);
  const [valueEmployeeController, setValueEmployeeController] = useState('');

  useEffect(() => {
    if (isEditing && currentEmployee) {
      setValueDepartmentController(currentEmployee.department?.name || '');
      setValueLocationController(currentEmployee.location?.name || '');
      setValueEmployeeController(
        `${currentEmployee.name} ${currentEmployee.surname}` || '',
      );
    }
  }, [isEditing, currentEmployee]);

  const ButtonText = () => {
    return isEditing ? 'Edit' : 'Add';
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {inputs &&
          inputs.map((input) => (
            <FormField
              key={input}
              control={form.control}
              name={input}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {input === 'newPassword'
                      ? 'New password'
                      : capitalizeFirstLetter(input)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={
                        input === 'email'
                          ? 'email'
                          : input === 'password' || input === 'newPassword'
                          ? 'password'
                          : 'text'
                      }
                      placeholder={
                        input === 'newPassword'
                          ? 'New password'
                          : capitalizeFirstLetter(input)
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

        {department && departments.length > 0 && (
          <Controller
            control={form.control}
            name="department"
            render={({ field }) => (
              <div>
                {ControllerLabel('Department')}
                <Popover
                  open={openDepartmentController}
                  onOpenChange={setOpenDepartmentController}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      role="combobox"
                      aria-expanded={openDepartmentController}
                      className="w-full justify-between"
                    >
                      {valueDepartmentController
                        ? departments.find(
                            (department) =>
                              department.name.toUpperCase() ===
                              valueDepartmentController.toUpperCase(),
                          )?.name
                        : 'Assign department...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[335px] max-w-[60vw] p-0">
                    <Command>
                      <CommandInput placeholder="Assign department..." />
                      <CommandEmpty>No department found.</CommandEmpty>
                      <CommandGroup>
                        {departments.map((department) => (
                          <CommandItem
                            key={department.id}
                            value={String(department.name)}
                            onSelect={(currentValue) => {
                              field.onChange(
                                currentValue === valueDepartmentController
                                  ? ''
                                  : currentValue,
                              );
                              setValueDepartmentController(
                                currentValue === valueDepartmentController
                                  ? ''
                                  : currentValue,
                              );
                              setOpenDepartmentController(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                valueDepartmentController.toUpperCase() ===
                                  department.name.toUpperCase()
                                  ? 'text-accent opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {department.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          />
        )}

        {location && locations.length > 0 && (
          <Controller
            control={form.control}
            name="location"
            render={({ field }) => (
              <div>
                {ControllerLabel('Location')}
                <Popover
                  open={openLocationController}
                  onOpenChange={setOpenLocationController}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      role="combobox"
                      aria-expanded={openLocationController}
                      className="w-full justify-between"
                    >
                      {valueLocationController
                        ? locations.find(
                            (location) =>
                              location.name.toUpperCase() ===
                              valueLocationController.toUpperCase(),
                          )?.name
                        : 'Assign location...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[335px] max-w-[60vw] p-0">
                    <Command>
                      <CommandInput placeholder="Assign location..." />
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {locations.map((location) => (
                          <CommandItem
                            key={location.id}
                            value={location.name}
                            onSelect={(currentValue) => {
                              field.onChange(
                                currentValue === valueLocationController
                                  ? ''
                                  : currentValue,
                              );
                              setValueLocationController(
                                currentValue === valueLocationController
                                  ? ''
                                  : currentValue,
                              );
                              setOpenLocationController(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                valueLocationController.toUpperCase() ===
                                  location.name.toUpperCase()
                                  ? 'text-accent opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {location.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          />
        )}

        {employee && employees.length > 0 && (
          <Controller
            control={form.control}
            name="employee"
            render={({ field }) => (
              <div>
                {ControllerLabel('Employee')}
                <Popover
                  open={openEmployeeController}
                  onOpenChange={setOpenEmployeeController}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      role="combobox"
                      aria-expanded={openEmployeeController}
                      className="w-full justify-between"
                    >
                      {valueEmployeeController
                        ? `${employees.find(
                            (employee) =>
                              `${employee.name} ${employee.surname}`.toUpperCase() ===
                              valueEmployeeController.toUpperCase(),
                          )?.name} 
                          ${employees.find(
                            (employee) =>
                              `${employee.name} ${employee.surname}`.toUpperCase() ===
                              valueEmployeeController.toUpperCase(),
                          )?.surname}`
                        : 'Assign employee...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[335px] max-w-[60vw] p-0">
                    <Command>
                      <CommandInput placeholder="Assign employee..." />
                      <CommandEmpty>No employee found.</CommandEmpty>
                      <CommandGroup>
                        {employees.map((employee) => (
                          <CommandItem
                            key={employee.id}
                            value={`${employee.name} ${employee.surname}`}
                            onSelect={(currentValue) => {
                              field.onChange(
                                currentValue === valueEmployeeController
                                  ? ''
                                  : currentValue,
                              );
                              setValueEmployeeController(
                                currentValue === valueEmployeeController
                                  ? ''
                                  : currentValue,
                              );
                              setOpenEmployeeController(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                valueEmployeeController.toUpperCase() ===
                                  `${employee.name} ${employee.surname}`.toUpperCase()
                                  ? 'text-accent opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {`${employee.name} ${employee.surname}`}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          />
        )}

        <Button type="submit" className={isLoading ? 'w-full opacity-60' : 'w-full'}>
          {isLoading ? <ClipLoader size={25} cssOverride={override} /> : ButtonText()}
        </Button>
      </form>
    </Form>
  );
};

export default SheetForm;
