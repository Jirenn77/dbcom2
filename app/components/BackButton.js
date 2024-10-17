"use client";

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center py-2 px-4 bg-gray-600 hover:bg-gray-500 transition rounded-md"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
      <span className="hidden">Back</span>
    </button>
  );
};

export default BackButton;
