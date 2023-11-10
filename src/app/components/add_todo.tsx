import { useState } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';
import { firestore } from '../lib/firebase_config';

type TaskInputFormProps = {
  onAddTask: (task: string) => void;
}

export function TaskInputForm({ onAddTask }: TaskInputFormProps) {
  const [task, setTask] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (task) {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input
          variant="filled"
          placeholder="新しいタスクを追加..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button colorScheme="blue" px="8" type="submit">
          追加
        </Button>
      </HStack>
    </form>
  );
}

export default TaskInputForm;
