import { useMemo } from 'react';
import { sort } from 'fast-sort';
import { Note } from '../types/types';

interface Props {
    filterOption: string;
    sortOption: string;
    initialNotes: Note[];
}

const useNotes = ({filterOption, sortOption, initialNotes}: Props) => {

  // Helper functions for date ranges
  const isToday = (timestamp: number) => {
    const today = new Date();
    const date = new Date(timestamp);
    // Compares only the date
    return today.toDateString() === date.toDateString(); 
  };

  const isThisWeek = (timestamp: number) => {
    const today = new Date();
    // Start of this week (Sunday)
    const startOfWeek = today.getDate() - today.getDay(); 
    const startOfWeekDate = new Date(today.setDate(startOfWeek));
    const noteDate = new Date(timestamp);
    return noteDate >= startOfWeekDate;
  };

  const isThisMonth = (timestamp: number) => {
    const today = new Date();
    const noteDate = new Date(timestamp);
    return noteDate.getMonth() === today.getMonth() && noteDate.getFullYear() === today.getFullYear();
  };


  // Filter notes based on the selected filter option
  const filteredNotes = useMemo(() => {
    let filtered = [...initialNotes];

    if (filterOption === 'today') {
      filtered = filtered.filter(note => isToday(note.createdAt));
    } else if (filterOption === 'this week') {
      filtered = filtered.filter(note => isThisWeek(note.createdAt));
    } else if (filterOption === 'this month') {
      filtered = filtered.filter(note => isThisMonth(note.createdAt));
    }

    return filtered;
  }, [filterOption, initialNotes]);

  // Sorting handler
  const sortedNotes = useMemo(() => {
    let sorted = [...filteredNotes];

    if (sortOption === 'title') {
      sorted = sort(sorted).asc(note => note.title.toLowerCase());
    } else if (sortOption === 'creation date') {
      sorted = sort(sorted).asc(note => note.createdAt);
    } else if (sortOption === 'updated date') {
      sorted = sort(sorted).asc(note => note.updatedAt);
    }

    return sorted;
  }, [sortOption, filteredNotes]);

  return { sortedNotes };
};

export default useNotes;
