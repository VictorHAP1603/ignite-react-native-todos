import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';
import { HandleEditProps } from '../pages/Home';

import { ItemWrapper } from './ItemWrapper';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import closeIcon from '../assets/icons/close.png'

type Props = {
    task: Task,
    index: number,
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, taskNewTitle }: HandleEditProps) => void
}

export const TaskItem = ({ task, index, editTask, removeTask, toggleTaskDone }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskValueEdited, setTaskValueEdited] = useState(task.title);
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTaskValueEdited(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        const taskEdited = {
            taskId: task.id,
            taskNewTitle: taskValueEdited
        }

        editTask(taskEdited)
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <ItemWrapper index={index}>
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        style={!task.done ? styles.taskMarker : styles.taskMarkerDone}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        onChangeText={setTaskValueEdited}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                        value={taskValueEdited}
                        style={!task.done ? styles.taskText : styles.taskTextDone}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.containerButtons}>
                {!isEditing ? (
                    <TouchableOpacity
                        style={[{ paddingHorizontal: 24 }, styles.actionButton]}
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[{ paddingHorizontal: 24 }, styles.actionButton]}
                        onPress={handleCancelEditing}
                    >
                        <Image source={closeIcon} />
                    </TouchableOpacity>
                )}

                <View style={styles.separator}></View>

                <TouchableOpacity
                    style={[{ paddingHorizontal: 24 }, styles.actionButton]}
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image style={{ opacity: isEditing ? 0.2 : 1 }} source={trashIcon} />
                </TouchableOpacity>
            </View>
        </ItemWrapper>
    )
}


const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 10,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },

    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },

    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },

    containerButtons: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center'
    },

    separator: {
        backgroundColor: "#C4C4C4",
        opacity: 0.5,
        width: 1,
        height: 24
    },

    actionButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})