import React, { useState } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const theme = extendTheme({
  colors: {
    brand: {
      light: '#5DADEC',
      dark: '#086788',
    },
  },
});

const Task = ({ task, onDelete }) => {
  const cardBgColor = useColorModeValue('gray.100', 'gray.700');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      shadow="md"
      bg={cardBgColor}
      borderColor={cardBorderColor}
    >
      <Flex justify="space-between" align="center">
        <Text>{task.name}</Text>
        <IconButton
          icon={<CloseIcon />}
          variant="ghost"
          onClick={() => onDelete(task.id)}
        />
      </Flex>
      <Text mt={2}>{task.description}</Text>
    </Box>
  );
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  const { colorMode, toggleColorMode } = useColorMode();

  const handleAddTask = () => {
    if (newTask.name && newTask.description) {
      const task = { ...newTask, id: Date.now() };
      setTasks([...tasks, task]);
      setNewTask({ name: '', description: '' });
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
 
  return (
    <Box p={4} bg={bgColor} minHeight="100vh">

      <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      <Heading mb={4} color={textColor}>
        Task Manager
      </Heading>
      <Stack spacing={4} mb={4}>
        <Input
          placeholder="Task name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <Input
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <Button  onClick={handleAddTask}>
          Add Task
        </Button>
        
      </Stack>
      <Stack spacing={4}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </Stack>
    </Box>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <TaskManager />
    </ChakraProvider>
  );
};

export default App;
