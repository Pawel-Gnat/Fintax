'use client';

import axios from 'axios';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

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

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const AlertDialog = () => {
  const router = useRouter();
  const {
    isAlertOpen,
    setIsAlertOpen,
    alertElementName,
    setAlertElementName,
    alertDatabaseName,
    setAlertDatabaseName,
  } = useContext(AlertDialogContext);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsAlertOpen(isAlertOpen);
  }, [isAlertOpen, setIsAlertOpen]);

  const handleDelete = () => {
    if (loading) return;

    setIsLoading(true);

    axios
      .delete(getDatabaseRoute(alertDatabaseName, alertElementName))
      .then(() => {
        toast({
          description: `${alertElementName} has been deleted.`,
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
        setAlertElementName('');
        setAlertDatabaseName('');
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
          <AlertDialogAction onClick={() => handleDelete()}>
            {loading ? <ClipLoader size={25} cssOverride={override} /> : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUI>
  );
};

export default AlertDialog;
