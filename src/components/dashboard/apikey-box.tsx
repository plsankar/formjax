import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import React, { FC, useState } from "react";

import CopyToClipboard from "react-copy-to-clipboard";

const ApikeyBox: FC<{ value: string }> = ({ value }) => {
    const [copied, setCopied] = useState(false);

    function handleOnCopyClicked() {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 500);
    }

    return (
        <div className="p-2 flex items-center gap-3 border rounded max-w-60">
            <span className="truncate text-sm flex-1">{value}</span>
            <CopyToClipboard text={value} onCopy={handleOnCopyClicked}>
                <button className="p-1 inline-flex items-center justify-center border rounded bg-secondary">
                    {!copied ? <ClipboardIcon className="w-3 h-3" /> : <CheckIcon className="w-3 h-3" />}
                </button>
            </CopyToClipboard>
        </div>
    );
};

export default ApikeyBox;
