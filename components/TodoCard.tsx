'use client';

import getUrl from '@/lib/getUrl';
import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {

  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log("this todo has no image", todo)
    if (todo.image) { 
        console.log("Fetchin url for", todo.image)
        const fetchImage = async () => { 
            const url = await getUrl(todo.image);
            console.log("url", url)
            if (url) { 
                setImageUrl(url.toString());
            }
        }
        fetchImage();
    }
  }, [todo])

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-2 rounded-md">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)} className="text-green-400 hover:text-green-500">
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>

      {/* Add image here */}
      {imageUrl && (
        <div className='h-full w-full rounded-b-md'>
            <Image 
            src={imageUrl}
            alt="Task Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
            />
        </div>
      )}
    </div>
  );
}
export default TodoCard;
