import React from 'react'
import MessageLeftBubble from './message-left-bubble';
import MessageRightBubble from './message-right-bubble';

const MessageContainer = () => {
    return (
        <div className="overflow-y-auto flex-grow">
            <div className="px-4 flex flex-col gap-2 dark:bg-oupia-base">
                <MessageLeftBubble chat={undefined} />
                <MessageRightBubble chat={undefined} />
                <MessageRightBubble chat={undefined} />
                <MessageLeftBubble chat={undefined} />
                <MessageLeftBubble chat={undefined} />
                <MessageRightBubble chat={undefined} />
                <MessageRightBubble chat={undefined} />
                <MessageRightBubble chat={undefined} />
                <MessageRightBubble chat={undefined} />
                <MessageLeftBubble chat={undefined} />
                <MessageLeftBubble chat={undefined} />
            </div>
        </div>
    )
}

export default MessageContainer;