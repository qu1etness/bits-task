import CreateWishDialog from './create-wish-dialog';


const ActionsBar = ({ totalWishes }: { totalWishes: number }) => {

    return (
        <div className="flex justify-between items-center">
            <div className="text-secondary-foreground sm:text-3xl">Total wishes - {totalWishes}</div>
            <div>
                <CreateWishDialog />
            </div>
        </div>
    );
};

export default ActionsBar;

