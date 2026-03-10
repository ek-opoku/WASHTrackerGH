import { SDGTarget } from "./sdg6-data";

export type TrajectoryStatus = "ON_TRACK" | "AT_RISK" | "OFF_TRACK";

export interface TrajectoryResult {
    hrp: number;
    rrp: number;
    mAccel: number;
    status: TrajectoryStatus;
}

export function calculateTrajectory(target: SDGTarget): TrajectoryResult {
    const { vBase, yBase, vCurr, yCurr, vTarget, yTarget } = target;

    // Historical Rate of Progress
    const hrp = (vCurr - vBase) / (yCurr - yBase);

    // Required Rate of Progress
    const rrp = (vTarget - vCurr) / (yTarget - yCurr);

    // Acceleration Multiplier
    let mAccel = 0;
    if (hrp > 0) {
        mAccel = rrp / hrp;
    } else if (hrp <= 0 && rrp > 0) {
        // If progress is negative or zero, but we still have distance to target, acceleration is technically infinite/undefined
        mAccel = -1; // We can use -1 to signify N/A or infinite required acceleration
    }

    // Traffic Light Status Classification
    let status: TrajectoryStatus = "OFF_TRACK";
    if (hrp >= rrp) {
        status = "ON_TRACK";
    } else if (hrp > 0 && hrp < rrp) {
        status = "AT_RISK";
    } else if (hrp <= 0) {
        status = "OFF_TRACK";
    }

    return {
        hrp,
        rrp,
        mAccel,
        status,
    };
}
