export type BaseDialogProps = {
    close: () => void;
    isOpen: boolean;
    open?: () => void;
}