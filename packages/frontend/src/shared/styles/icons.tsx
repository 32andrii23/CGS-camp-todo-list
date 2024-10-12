import React from 'react';
import { CircleCheck, CircleX, Lock, LockOpen } from 'lucide-react';

import { colors } from '~shared/styles';

export const completionIcons = {
	true: <CircleCheck size={22} color={colors.checkGreen} />,
	false: <CircleX size={22} color={colors.xRed} />,
};

export const privacyIcons = {
	true: <Lock size={16} color={colors.primaryText} />,
	false: <LockOpen size={16} color={colors.primaryText} />,
};
