import { Text } from '@/components/ui/text';
import type { Breakpoint } from '@/lib/use-breakpoint';
import * as React from 'react';
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, Ellipse, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useUniwind } from 'uniwind';

export type AuthVisualVariant = 'neutral' | 'candidate' | 'company';

type AuthVisualPanelProps = {
  variant: AuthVisualVariant;
  breakpoint: Breakpoint;
};

const COPY: Record<
  AuthVisualVariant,
  { eyebrow: string; title: string; description: string; bullets: string[] }
> = {
  neutral: {
    eyebrow: "Eagle's Eye",
    title: 'Careers',
    description: 'Built for modern hiring',
    bullets: ['Unified platform', 'Fast hiring', 'Built to scale'],
  },

  candidate: {
    eyebrow: 'Candidates',
    title: 'Find work',
    description: 'Discover roles that fit',
    bullets: ['Smart matches', 'Quick apply', 'Track progress'],
  },

  company: {
    eyebrow: 'Companies',
    title: 'Hire better',
    description: 'Manage hiring with clarity',
    bullets: ['Talent pipeline', 'Easy hiring', 'Hiring insights'],
  },
};
const ACCENT = {
  neutral: {
    core: '#6366f1',
    glow: '#818cf8',
    secondary: '#f59e0b',
    bgDark: '#0a0a14',
    bgMid: '#0f0e22',
    eyebrow: '#a5b4fc',
    title: '#f0f0ff',
    description: '#c4c4e0',
    featPrimaryBg: 'rgba(99,102,241,0.14)',
    featPrimaryBorder: 'rgba(99,102,241,0.55)',
    featPrimaryText: '#e0e0ff',
    featSecondaryBg: 'rgba(255,255,255,0.06)',
    featSecondaryBorder: 'rgba(255,255,255,0.10)',
    featSecondaryText: '#a0a0c0',
    featTertiaryBg: 'rgba(255,255,255,0.04)',
    featTertiaryBorder: 'rgba(255,255,255,0.07)',
    featTertiaryText: '#909090',
  },
  candidate: {
    core: '#10b981',
    glow: '#34d399',
    secondary: '#6366f1',
    bgDark: '#050f0b',
    bgMid: '#071a12',
    eyebrow: '#6ee7b7',
    title: '#e8fff7',
    description: '#a0c8b8',
    featPrimaryBg: 'rgba(16,185,129,0.13)',
    featPrimaryBorder: 'rgba(16,185,129,0.50)',
    featPrimaryText: '#d1fae5',
    featSecondaryBg: 'rgba(255,255,255,0.05)',
    featSecondaryBorder: 'rgba(255,255,255,0.09)',
    featSecondaryText: '#8ab8a4',
    featTertiaryBg: 'rgba(255,255,255,0.04)',
    featTertiaryBorder: 'rgba(255,255,255,0.06)',
    featTertiaryText: '#7a9e90',
  },
  company: {
    core: '#0ea5e9',
    glow: '#38bdf8',
    secondary: '#818cf8',
    bgDark: '#040c14',
    bgMid: '#071524',
    eyebrow: '#7dd3fc',
    title: '#e8f7ff',
    description: '#90b8cc',
    featPrimaryBg: 'rgba(14,165,233,0.13)',
    featPrimaryBorder: 'rgba(14,165,233,0.50)',
    featPrimaryText: '#bae6fd',
    featSecondaryBg: 'rgba(255,255,255,0.05)',
    featSecondaryBorder: 'rgba(255,255,255,0.09)',
    featSecondaryText: '#7da8bc',
    featTertiaryBg: 'rgba(255,255,255,0.04)',
    featTertiaryBorder: 'rgba(255,255,255,0.06)',
    featTertiaryText: '#6d96a8',
  },
} as const;

// Light-mode equivalents
const ACCENT_LIGHT = {
  neutral: {
    bgSurface: '#f4f4ff',
    blob1: 'rgba(99,102,241,0.18)',
    blob2: 'rgba(245,158,11,0.12)',
    blob3: 'rgba(99,102,241,0.10)',
    eyebrow: '#4f46e5',
    title: '#1e1b4b',
    description: '#4338ca',
    featPrimaryBg: 'rgba(99,102,241,0.10)',
    featPrimaryBorder: 'rgba(99,102,241,0.40)',
    featPrimaryText: '#312e81',
    featSecondaryBg: 'rgba(255,255,255,0.75)',
    featSecondaryBorder: 'rgba(15,23,42,0.12)',
    featSecondaryText: '#4338ca',
    featTertiaryBg: 'rgba(255,255,255,0.55)',
    featTertiaryBorder: 'rgba(15,23,42,0.08)',
    featTertiaryText: '#5b51d8',
  },
  candidate: {
    bgSurface: '#f0fdf8',
    blob1: 'rgba(16,185,129,0.18)',
    blob2: 'rgba(99,102,241,0.10)',
    blob3: 'rgba(16,185,129,0.10)',
    eyebrow: '#059669',
    title: '#064e3b',
    description: '#047857',
    featPrimaryBg: 'rgba(16,185,129,0.10)',
    featPrimaryBorder: 'rgba(16,185,129,0.38)',
    featPrimaryText: '#064e3b',
    featSecondaryBg: 'rgba(255,255,255,0.75)',
    featSecondaryBorder: 'rgba(15,23,42,0.10)',
    featSecondaryText: '#065f46',
    featTertiaryBg: 'rgba(255,255,255,0.55)',
    featTertiaryBorder: 'rgba(15,23,42,0.07)',
    featTertiaryText: '#047857',
  },
  company: {
    bgSurface: '#f0f9ff',
    blob1: 'rgba(14,165,233,0.18)',
    blob2: 'rgba(129,140,248,0.10)',
    blob3: 'rgba(14,165,233,0.10)',
    eyebrow: '#0284c7',
    title: '#0c2340',
    description: '#0369a1',
    featPrimaryBg: 'rgba(14,165,233,0.10)',
    featPrimaryBorder: 'rgba(14,165,233,0.38)',
    featPrimaryText: '#0c4a6e',
    featSecondaryBg: 'rgba(255,255,255,0.75)',
    featSecondaryBorder: 'rgba(15,23,42,0.10)',
    featSecondaryText: '#075985',
    featTertiaryBg: 'rgba(255,255,255,0.55)',
    featTertiaryBorder: 'rgba(15,23,42,0.07)',
    featTertiaryText: '#0369a1',
  },
} as const;

const s = StyleSheet.create({
  rootWide: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  rootHero: {
    position: 'relative',
    overflow: 'hidden',
    flexGrow: 0,
    flexShrink: 0,
  },
  // Content anchored to bottom
  innerWide: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
    paddingBottom: 36,
    paddingTop: 48,
    zIndex: 2,
  },
  innerNarrow: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 22,
    paddingBottom: 28,
    paddingTop: 36,
    zIndex: 2,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.0,
    textTransform: 'uppercase',
    marginBottom: 10,
    opacity: 0.75,
  },
  title: {
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 36,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 22,
    opacity: 0.65,
  },
  features: {
    gap: 8,
  },
  featPrimary: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  featPrimaryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  featSecondary: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'flex-start',
    maxWidth: '88%',
  },
  featTertiary: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'flex-end',
    maxWidth: '84%',
  },
  featSubText: {
    fontSize: 13,
  },
  // Chip layout for narrow
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chipPrimary: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  chipSecondary: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  chipText: { fontSize: 12, fontWeight: '500' },
  chipSubText: { fontSize: 12 },
  // Animated blobs
  blobSlot: {
    position: 'absolute',
  },
});

// ─── SVG Backdrop ─────────────────────────────────────────────────────────────

function SvgBackdrop({
  w,
  h,
  accent,
  isDark,
  gid,
}: {
  w: number;
  h: number;
  accent: (typeof ACCENT)[AuthVisualVariant];
  isDark: boolean;
  gid: string;
}) {
  if (w < 8 || h < 8) return null;

  const bgColor = isDark ? accent.bgDark : '#f8f8ff';

  const r1id = `r1-${gid}`;
  const r2id = `r2-${gid}`;
  const r3id = `r3-${gid}`;
  const vigId = `vig-${gid}`;

  const blob1Color = isDark ? accent.core : accent.core;
  const blob2Color = isDark ? accent.secondary : accent.secondary;
  const blob3Color = isDark ? accent.glow : accent.glow;

  const b1Opacity = isDark ? 0.38 : 0.16;
  const b2Opacity = isDark ? 0.20 : 0.10;
  const b3Opacity = isDark ? 0.16 : 0.09;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <Defs>
          <RadialGradient id={r1id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={blob1Color} stopOpacity={b1Opacity} />
            <Stop offset="1" stopColor={blob1Color} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={r2id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={blob2Color} stopOpacity={b2Opacity} />
            <Stop offset="1" stopColor={blob2Color} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={r3id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={blob3Color} stopOpacity={b3Opacity} />
            <Stop offset="1" stopColor={blob3Color} stopOpacity={0} />
          </RadialGradient>
          <LinearGradient id={vigId} x1="0.5" y1="0" x2="0.5" y2="1">
            <Stop offset="0" stopColor={isDark ? '#000' : '#fff'} stopOpacity={isDark ? 0.08 : 0.30} />
            <Stop offset="0.5" stopColor="transparent" stopOpacity={0} />
            <Stop offset="1" stopColor={isDark ? '#000' : '#000'} stopOpacity={isDark ? 0.38 : 0.06} />
          </LinearGradient>
        </Defs>
        {/* Base */}
        <Rect width={w} height={h} fill={bgColor} />
        {/* Blob 1 – top-right hero */}
        <Ellipse cx={w * 1.05} cy={h * -0.12} rx={w * 0.72} ry={h * 0.52} fill={`url(#${r1id})`} />
        {/* Blob 2 – bottom-left secondary */}
        <Ellipse cx={w * -0.08} cy={h * 1.05} rx={w * 0.56} ry={h * 0.42} fill={`url(#${r2id})`} />
        {/* Blob 3 – mid-right accent */}
        <Ellipse cx={w * 0.82} cy={h * 0.62} rx={w * 0.38} ry={h * 0.32} fill={`url(#${r3id})`} />
        {/* Vignette */}
        <Rect width={w} height={h} fill={`url(#${vigId})`} />
      </Svg>
    </View>
  );
}

// ─── Wide Feature Rows ─────────────────────────────────────────────────────────

function WideFeatureRows({
  bullets,
  colors,
}: {
  bullets: string[];
  colors: {
    featPrimaryBg: string;
    featPrimaryBorder: string;
    featPrimaryText: string;
    featSecondaryBg: string;
    featSecondaryBorder: string;
    featSecondaryText: string;
    featTertiaryBg: string;
    featTertiaryBorder: string;
    featTertiaryText: string;
  };
  isWeb: boolean;
}) {
  const [a, b, c] = bullets;

  return (
    <View style={s.features}>
      <View
        style={[
          s.featPrimary,
          {
            backgroundColor: colors.featPrimaryBg,
            borderLeftColor: colors.featPrimaryBorder,
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
          },
        ]}
      >
        <Text style={[s.featPrimaryText, { color: colors.featPrimaryText }]}>{a}</Text>
      </View>

      <View
        style={[
          s.featSecondary,
          {
            backgroundColor: colors.featSecondaryBg,
            borderColor: colors.featSecondaryBorder,
          },
        ]}
      >
        <Text style={[s.featSubText, { color: colors.featSecondaryText }]}>{b}</Text>
      </View>

      <View
        style={[
          s.featTertiary,
          {
            backgroundColor: colors.featTertiaryBg,
            borderColor: colors.featTertiaryBorder,
          },
        ]}
      >
        <Text style={[s.featSubText, { color: colors.featTertiaryText }]}>{c}</Text>
      </View>
    </View>
  );
}

// ─── Narrow Feature Chips ──────────────────────────────────────────────────────

function NarrowFeatureChips({
  bullets,
  colors,
}: {
  bullets: string[];
  colors: {
    featPrimaryBg: string;
    featPrimaryBorder: string;
    featPrimaryText: string;
    featSecondaryBg: string;
    featSecondaryBorder: string;
    featSecondaryText: string;
    featTertiaryBg: string;
    featTertiaryBorder: string;
    featTertiaryText: string;
  };
}) {
  const [first, second, third] = bullets;

  return (
    <View style={s.chipRow}>
      <View
        style={[
          s.chipPrimary,
          {
            backgroundColor: colors.featPrimaryBg,
            borderColor: colors.featPrimaryBorder,
          },
        ]}
      >
        <Text style={[s.chipText, { color: colors.featPrimaryText }]}>{first}</Text>
      </View>
      <View
        style={[
          s.chipSecondary,
          {
            backgroundColor: colors.featSecondaryBg,
            borderColor: colors.featSecondaryBorder,
          },
        ]}
      >
        <Text style={[s.chipSubText, { color: colors.featSecondaryText }]}>{second}</Text>
      </View>
      {third ? (
        <View
          style={[
            s.chipSecondary,
            {
              backgroundColor: colors.featTertiaryBg,
              borderColor: colors.featTertiaryBorder,
            },
          ]}
        >
          <Text style={[s.chipSubText, { color: colors.featTertiaryText }]}>{third}</Text>
        </View>
      ) : null}
    </View>
  );
}

// ─── Web-only Blob (div-based radial gradient) ─────────────────────────────────

function WebBlob({
  color,
  opacity,
  style,
}: {
  color: string;
  opacity: number;
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        borderRadius: '50%',
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        opacity,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function AuthVisualPanel({ variant, breakpoint }: AuthVisualPanelProps) {
  const isWeb = Platform.OS === 'web';
  const { theme } = useUniwind();
  const isDark = theme === 'dark';
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [panelSize, setPanelSize] = React.useState({ w: 0, h: 0 });
  const reactId = React.useId();
  const svgGid = React.useMemo(() => {
    const raw = reactId.replace(/[^a-zA-Z0-9]/g, '');
    return raw.length > 0 ? raw : 'authvis';
  }, [reactId]);

  // Ambient drift animations
  const drift = useSharedValue(0);
  const driftSlow = useSharedValue(0);

  React.useEffect(() => {
    drift.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 9000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 9000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    );
    driftSlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 14000, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 14000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, [drift, driftSlow]);

  // Blob 1 – top-right hero blob
  const blob1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: drift.value * 18 - 9 },
      { translateY: driftSlow.value * 12 - 6 },
    ],
    opacity: isDark ? 0.38 + driftSlow.value * 0.06 : 0.16 + driftSlow.value * 0.04,
  }));

  // Blob 2 – bottom-left secondary blob
  const blob2Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: drift.value * -12 + 6 },
      { translateY: driftSlow.value * -8 + 4 },
    ],
    opacity: isDark ? 0.20 + drift.value * 0.05 : 0.10 + drift.value * 0.03,
  }));

  // Blob 3 – mid-right accent blob
  const blob3Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: driftSlow.value * 10 - 5 },
      { translateY: drift.value * -6 + 3 },
    ],
    opacity: isDark ? 0.16 + drift.value * 0.06 : 0.09 + drift.value * 0.04,
  }));

  const copy = COPY[variant];
  const isWide = breakpoint !== 'mobile';
  const accentDark = ACCENT[variant];
  const accentLight = ACCENT_LIGHT[variant];

  const colors = isDark
    ? {
        eyebrow: accentDark.eyebrow,
        title: accentDark.title,
        description: accentDark.description,
        featPrimaryBg: accentDark.featPrimaryBg,
        featPrimaryBorder: accentDark.featPrimaryBorder,
        featPrimaryText: accentDark.featPrimaryText,
        featSecondaryBg: accentDark.featSecondaryBg,
        featSecondaryBorder: accentDark.featSecondaryBorder,
        featSecondaryText: accentDark.featSecondaryText,
        featTertiaryBg: accentDark.featTertiaryBg,
        featTertiaryBorder: accentDark.featTertiaryBorder,
        featTertiaryText: accentDark.featTertiaryText,
      }
    : {
        eyebrow: accentLight.eyebrow,
        title: accentLight.title,
        description: accentLight.description,
        featPrimaryBg: accentLight.featPrimaryBg,
        featPrimaryBorder: accentLight.featPrimaryBorder,
        featPrimaryText: accentLight.featPrimaryText,
        featSecondaryBg: accentLight.featSecondaryBg,
        featSecondaryBorder: accentLight.featSecondaryBorder,
        featSecondaryText: accentLight.featSecondaryText,
        featTertiaryBg: accentLight.featTertiaryBg,
        featTertiaryBorder: accentLight.featTertiaryBorder,
        featTertiaryText: accentLight.featTertiaryText,
      };

  const onRootLayout = React.useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setPanelSize({ w: Math.round(width), h: Math.round(height) });
  }, []);

  const nativeHeroStyle = React.useMemo(
    () => ({
      minHeight: Math.round(windowHeight * 0.42),
      maxHeight: Math.round(windowHeight * 0.48),
    }),
    [windowHeight]
  );

  const blobMetrics = React.useMemo(() => {
    const w = panelSize.w || Math.min(windowWidth * 0.5, 520);
    const h = panelSize.h || windowHeight;
    return { w, h };
  }, [panelSize, windowWidth, windowHeight]);

  // ── Inner copy content (no containment card wrapper) ───────────────────────
  const innerContent = (
<>
  {/* Eyebrow */}
  <Text
    className={
      isWeb
        ? 'mb-3 text-[11px] font-medium uppercase tracking-[0.28em]'
        : ''
    }
    style={
      !isWeb
        ? [
            s.eyebrow,
            {
              color: colors.eyebrow,
              opacity: 0.62,
              letterSpacing: 4,
              marginBottom: 10,
            },
          ]
        : {
            color: colors.eyebrow,
            opacity: 0.62,
          }
    }
  >
    {copy.eyebrow}
  </Text>

  {/* Title */}
  <Text
    className={
      isWeb
        ? 'text-[34px] font-light leading-[42px] tracking-[-1.4px]'
        : ''
    }
    style={
      !isWeb
        ? [
            s.title,
            {
              color: colors.title,
              fontWeight: '300',
              lineHeight: 42,
              letterSpacing: -1.4,
            },
          ]
        : {
            color: colors.title,
          }
    }
  >
    {copy.title}
  </Text>

  {/* Accent divider */}
  <View
    className={isWeb ? 'mt-5 h-px w-14 rounded-full' : ''}
    style={{
      marginTop: 20,
      width: 56,
      height: 1,
      borderRadius: 999,
      backgroundColor: colors.title,
      opacity: 0.18,
    }}
  />

  {/* Description */}
  <Text
    className={
      isWeb
        ? 'mt-5 max-w-[460px] text-[14px] leading-7 tracking-[0.01em]'
        : ''
    }
    style={
      !isWeb
        ? [
            s.description,
            {
              color: colors.description,
              opacity: 0.72,
              marginTop: 20,
              lineHeight: 28,
              letterSpacing: 0.15,
            },
          ]
        : {
            color: colors.description,
            opacity: 0.72,
          }
    }
  >
    {copy.description}
  </Text>

  {/* Features */}
  <View
    style={{
      marginTop: 32,
      paddingBottom: 28,
    }}
  >
    {isWide ? (
      <WideFeatureRows
        bullets={copy.bullets}
        colors={colors}
        isWeb={isWeb}
      />
    ) : (
      <NarrowFeatureChips
        bullets={copy.bullets}
        colors={colors}
      />
    )}
  </View>
</>
  );

  // ── Blobs (native) ─────────────────────────────────────────────────────────
  const nativeLayers = (
    <>
      {panelSize.w > 0 && panelSize.h > 0 && (
        <SvgBackdrop
          w={panelSize.w}
          h={panelSize.h}
          accent={accentDark}
          isDark={isDark}
          gid={svgGid}
        />
      )}

      {/* Blob 1 – top-right */}
      <Animated.View
        pointerEvents="none"
        style={[
          s.blobSlot,
          blob1Style,
          {
            width: blobMetrics.w * 1.42,
            height: blobMetrics.h * 0.6,
            top: -blobMetrics.h * 0.18,
            right: -blobMetrics.w * 0.22,
            borderRadius: 9999,
            backgroundColor: accentDark.core,
          },
        ]}
      />

      {/* Blob 2 – bottom-left */}
      <Animated.View
        pointerEvents="none"
        style={[
          s.blobSlot,
          blob2Style,
          {
            width: blobMetrics.w * 1.1,
            height: blobMetrics.h * 0.5,
            bottom: -blobMetrics.h * 0.22,
            left: -blobMetrics.w * 0.25,
            borderRadius: 9999,
            backgroundColor: accentDark.secondary,
          },
        ]}
      />

      {/* Blob 3 – mid-right accent */}
      <Animated.View
        pointerEvents="none"
        style={[
          s.blobSlot,
          blob3Style,
          {
            width: blobMetrics.w * 0.72,
            height: blobMetrics.h * 0.36,
            top: blobMetrics.h * 0.44,
            right: -blobMetrics.w * 0.14,
            borderRadius: 9999,
            backgroundColor: accentDark.glow,
          },
        ]}
      />
    </>
  );

  // ── Web render ─────────────────────────────────────────────────────────────
  if (isWeb) {
    const bgSurface = isDark ? accentDark.bgDark : accentLight.bgSurface;

    return (
      <View
        className={`relative overflow-hidden ${
          isWide ? 'flex-1' : 'min-h-[42%] max-h-[48%] flex-[0.45]'
        }`}
        style={{ backgroundColor: bgSurface }}
        onLayout={onRootLayout}
      >
        {/* Web blobs via divs (CSS radial gradient) */}
        <WebBlob
          color={accentDark.core}
          opacity={isDark ? 0.38 : 0.16}
          style={{
            width: '140%',
            height: '60%',
            top: '-18%',
            right: '-22%',
          }}
        />
        <WebBlob
          color={accentDark.secondary}
          opacity={isDark ? 0.20 : 0.10}
          style={{
            width: '110%',
            height: '50%',
            bottom: '-22%',
            left: '-25%',
          }}
        />
        <WebBlob
          color={accentDark.glow}
          opacity={isDark ? 0.16 : 0.09}
          style={{
            width: '72%',
            height: '36%',
            top: '44%',
            right: '-14%',
          }}
        />

        {/* Vignette overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isDark
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 50%, rgba(0,0,0,0.38) 100%)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.30) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Content – anchored to bottom */}
        <View
  className={`relative z-10 flex-1 ${
    isWide
      ? 'justify-end px-12 pb-12 pt-14'
      : 'justify-end px-7 pb-8 pt-10'
  }`}
>
  {/* Content wrapper */}
  <View className="max-w-[560px]">
    {/* Eyebrow */}
    <Text
      className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em]"
      style={{
        color: colors.eyebrow,
        opacity: 0.62,
      }}
    >
      {copy.eyebrow}
    </Text>

    {/* Title */}
    <Text
      className="text-[34px] font-light leading-[42px] tracking-[-1.4px]"
      style={{
        color: colors.title,
        maxWidth: 460,
      }}
    >
      {copy.title}
    </Text>

    {/* Accent divider */}
    <View
      className="mt-5 h-px w-14 rounded-full"
      style={{
        backgroundColor: colors.title,
        opacity: 0.18,
      }}
    />

    {/* Description */}
    <Text
      className="mt-5 max-w-[460px] text-[14px] leading-7 tracking-[0.01em]"
      style={{
        color: colors.description,
        opacity: 0.72,
      }}
    >
      {copy.description}
    </Text>

    {/* Feature cards */}
    <View className="mt-10 flex-row flex-wrap gap-3">
      {copy.bullets.map((item) => (
        <View
          key={item}
          className="rounded-2xl border px-4 py-3"
          style={{
            backgroundColor: 'rgba(255,255,255,0.035)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <Text
            className="text-sm font-normal"
            style={{
              color: colors.description,
              opacity: 0.9,
            }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  </View>
</View>
      </View>
    );
  }

  // ── Native render ──────────────────────────────────────────────────────────
  return (
    <View
      style={[
        isWide ? s.rootWide : [s.rootHero, nativeHeroStyle],
        { backgroundColor: accentDark.bgDark },
      ]}
      onLayout={onRootLayout}
    >
      {nativeLayers}
      <View style={isWide ? s.innerWide : s.innerNarrow}>{innerContent}</View>
    </View>
  );
}