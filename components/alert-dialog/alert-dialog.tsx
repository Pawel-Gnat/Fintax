'use client';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AlertDialogContext } from '@/context/alert-dialog-context';

import getDatabaseRoute from '@/utils/getDatabaseRoute';

import { toast } from '../ui/use-toast';
import {
  AlertDialog as AlertDialogUI,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const AlertDialog = () => {
  const router = useRouter();
  const {
    isAlertOpen,
    setIsAlertOpen,
    elementName,
    setElementName,
    databaseName,
    setDatabaseName,
  } = useContext(AlertDialogContext);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsAlertOpen(isAlertOpen);
  }, [isAlertOpen, setIsAlertOpen]);

  const handleDelete = () => {
    if (loading) return;

    setIsLoading(true);

    axios
      .patch(getDatabaseRoute(databaseName, elementName))
      .then(() => {
        toast({
          description: `${elementName} has been deleted.`,
        });
        router.refresh();
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          description: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
        setElementName('');
        setDatabaseName('');
      });
  };

  return (
    <AlertDialogUI open={isAlertOpen} onOpenChange={() => setIsAlertOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUI>
  );
};

export default AlertDialog;
